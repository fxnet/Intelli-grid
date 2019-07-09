/**
 * 邮件监测数据排名。
 * @param svg
 * @param params
 */

import d3 from "../../../static/js/common/d3.min";
import Enumerable from "linq";

class stacked_Column {
  constructor(svg, params) {
    this.params = params || {};
    var params = {
      width: 350,
      height: 400,
      rectPadding: 4,
      rect_radius: 3,
      type:params.type || "",
      fontClass:params.fontClass || "emailSort",
      fontClass_Bottom:params.fontClass_Bottom || "emailSort_font"
    };
    for (var one in params) {
      if (!this.params[one])
        this.params[one] = params[one];
    }
    var margin = {top: 20, right: 0, bottom: 50, left: 0},
      width = this.params.width - margin.left - margin.right,
      height = this.params.height - margin.top - margin.bottom;
    this.width = width;
    this.height = height;
    svg = svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.margin = margin;
    this.svg = svg;
  }

  init(data) {
    var that = this;
    var svg = this.svg;
    this.svg.selectAll("*").remove();
    var x = d3.scale.ordinal()
      .rangeRoundBands([0, this.width - 60], .3);
    this.x = x;
    var y = d3.scale.linear()
      .rangeRound([this.height, 0]);
    this.y = y;
    var color_temp = d3.scale.category10();
    var color = d3.scale.ordinal()
      .range([color_temp(0), color_temp(1), color_temp(2),color_temp(3),color_temp(4)]);
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".2s"));
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    color.domain(d3.keys(data[0].children));
    this.color = color;
    data.forEach(function(d) {
      var y0 = 0;
      d.ages = color.domain().map(function(name) {
        return {name: d.children[name].name, y0: y0, y1: y0 += +d.children[name].count};
      });
      d.total = d.ages[d.ages.length - 1].y1;
    });
    data.sort(function(a, b) { return b.total - a.total; });
    this.dataList = data;
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (this.height + 10) + ")")
      .call(function (sel) {
        var xA = xAxis(sel);
        sel.each(function () {
          var tick = this.children;
          for(var i=0;i<tick.length - 1;i++) {
            d3.select(tick[i].children[1]).remove();

            d3.select(tick[i]).append("circle")
              .attr("cx",0)
              .attr("cy",10)
              .attr("r",10)
              .attr("fill","#dadada")
              .on("mouseover",function (d) {
                var txt_g = svg.append("g")
                  .attr("transform","translate(0," + (that.height - 20) + ")");
                var txt_width = 0;
                var id = "column_labeTitle";
                var label;
                var column_labeTitle = document.body.querySelector("#"+id);
                if(!column_labeTitle){
                  column_labeTitle = document.createElement("div");
                  column_labeTitle.className = id;
                  column_labeTitle.id = id;
                  document.body.appendChild(column_labeTitle);
                  label = document.createElement("label");
                  column_labeTitle.appendChild(label);
                }else{
                  label = column_labeTitle.querySelector("label");
                }
                column_labeTitle.style.display = "block";
                label.innerHTML = d;
                column_labeTitle.style.left = (event.x + 5) + "px";
                column_labeTitle.style.top = event.y + "px";
              })
              .on("mouseout",function (d) {
                if(document.body.querySelector("#column_labeTitle"))
                  document.body.querySelector("#column_labeTitle").style.display="none";
              });
          }
        });
        return xA;
      });
    var state = svg.selectAll(".state")
      .data(data)
      .enter().append("g")
      .attr("class", "g")
      .attr("id",function(d){
        return "rect_" + d.name;
      })
      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });
    state.selectAll("rect")
      .data(function(d) { return d.ages; })
      .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return that.get_img(d.name)[2]; });
    state.append("g")
      .attr("transform", function(d) { return "translate(" + (x(data[0].name)-5) + ",0)"; })
      .append("text")
      .attr("class",that.params.fontClass || "emailSort")
      .attr("font-size","2rem")
      .attr("transform","translate(" + (that.margin.left + 6) + "," + that.margin.top + ")")
      .attr("y",function(d){
        return this.parentNode.parentNode.children[4].getAttribute("y") - 25;
      })
      .text(function(d){
        return d.total;
      });
    this.init_tuli();
  }

  /**
   * 获取图片地址。
   * @param type
   */
  get_img(type){
    switch (type){
      case "qq":
        return ["../../../static/img/svg/tuli/iconfont_qq_security.svg","及时通讯数据量",'rgb(31, 119, 180)'];
        break;
      case "folder":
        return ["../../../static/img/svg/tuli/iconfont_folder_security.svg","内网终端文件检查结果数据量",'rgb(255, 127, 14)'];
        break;
      case "dist":
        return ["../../../static/img/svg/tuli/iconfont_disk_security.svg","内网机拷贝出的文件量",'rgb(44, 160, 44)'];
        break;
      case "ie":
        return ["../../../static/img/svg/tuli/iconfont_browser_security.svg","外网上网行为统计量",'rgb(214, 39, 40)'];
        break;
      case "email":
        return ["../../../static/img/svg/tuli/iconfont_mail_security.svg","敏感邮件发送统计量",'rgb(148, 103, 189)'];
        break;
    }
  }

  /**
   * 加载右侧图例。
   */
  init_tuli(){
    var that = this;
    var svg = that.svg;
    svg.selectAll(".legend").remove();
    var show_list_btn = ["qq","folder","dist","ie","email"];
    var legend = svg.selectAll(".legend")
      .data(show_list_btn)
      .enter().append("g")
      .attr("class", "legend")
      .attr("id",function(d){
        return "legend_"+d;
      })
      .style("font-color",'white')
      .attr("transform", function(d, i) { return "translate(0," + i * 23 + ")"; })
    legend.append("rect")
      .attr("x", this.width - 18)
      .attr("width", 18)
      .attr("class","cat")
      .attr("height", 18)
      .style("fill", function(d){
        var children = Enumerable.from(that.dataList[0].children).where("$.name=='"+d+"'").toArray()[0];
        if(children.hidden)
          return "#5f5e5e";
        else
          return that.get_img(d)[2];
      })
      .on("click",function (d,i) {
        if(!Enumerable.from(that.dataList[0].children).where("$.name=='"+d+"'").toArray()[0].hidden){
          for(var i = 0;i<that.dataList.length;i++){
            var item = that.dataList[i];
            var children = Enumerable.from(item.children).where("$.name=='"+d+"'").toArray()[0];
            if(children){
              children.hidden = true
            }
          }
          this.style.fill = "#5f5e5e";
        }else{
          for(var i = 0;i<that.dataList.length;i++){
            var item = that.dataList[i];
            var children = Enumerable.from(item.children).where("$.name=='"+d+"'").toArray()[0];
            if(children){
              children.hidden = false
            }
          }
          this.style.fill = that.get_img(d)[2];
        }
        that.change(that.dataList);
      })
      .attr("rx",3);
    legend.append("image")
      .attr("x", this.width - 38)
      .attr("y", 2)
      .attr("width",15)
      .attr("class",'legend_txt')
      .attr("dy", "0.35em")
      .style("text-anchor", "end")
      .attr("xlink:href",function(d) {
        return that.get_img(d)[0];
      })
      .on("mouseover",function (d,i,a) {
        this.parentNode.children[2].style.display="block";
      })
      .on("mouseout",function(){
        this.parentNode.children[2].style.display="none";
      });

    var tip_g = legend.append("g")
      .attr("class","label_tip")
      .attr("transform",function (d) {
        var txt = that.get_img(d)[1];
        var width = txt.length * 15;
        return "translate("+(that.width - width - 45)+",0)";
      });
    tip_g.append("rect")
      .attr("rx",3)
      .attr("x",function (d) {
        if(d==="folder")
          return 30;
        else
          return 15;
      })
      .attr("width",function (d) {
        var txt = that.get_img(d)[1];
        var width = txt.length * 13;
        return width;
      })
      .attr("height",25);
    tip_g.append("text")
      .attr("y",18)
      .attr("x",function (d) {
        if(d==="folder")
          return 35;
        else
          return 18;
      })
      .text(function (d) {
        return that.get_img(d)[1];
      });
  }

  /**
   * 修改。
   * @param emailList
   */
  change(emailList){
    var that = this;
    var svg = this.svg;
    var x = this.x;
    var y = this.y;
    var xAxis = this.xAxis;
    if(this.dataList.length === 0){
      this.dataList = JSON.parse(JSON.stringify(emailList));
    }
    var dataList_temp2 = Enumerable.from(this.dataList).toArray();
    var dataList_temp = [];
    for(var i=0;i<emailList.length;i++){
      var item = emailList[i];
      var source = Enumerable.from(dataList_temp2).where("$.name=='"+item.name+"'").toArray()[0];
      if(!source){
        source = JSON.parse(JSON.stringify(item));
      }
      for(var j =0;j<item.children.length;j++){
        item.children[j].hidden = source.children[j].hidden;
        source.children[j].count = item.children[j].count;
      }
      if(source) {
        dataList_temp.push(item);
      }
    }
    svg.selectAll(".g").remove();
    svg.selectAll(".x.axis").remove();
    if(dataList_temp.length === 0 || Enumerable.from(dataList_temp[0].children).where("!$.hidden").toArray().length === 0) return;
    this.color.domain(d3.keys(Enumerable.from(dataList_temp[0].children).toArray()));
    dataList_temp.forEach(function(d) {
      var y0 = 0;
      d.ages = that.color.domain().map(function(name) {
        if(!d.children[name].hidden)
          return {name: d.children[name].name, y0: y0, y1: y0 += +d.children[name].count,hidden:d.children[name].hidden};
      });
      d.ages = Enumerable.from(d.ages).where("$").toArray();
      d.total = d.ages[d.ages.length - 1].y1;
    });
    dataList_temp.sort(function(a, b) { return b.total - a.total; });
    x.domain(dataList_temp.map(function(d) { return d.name; }));
    y.domain([0, d3.max(dataList_temp, function(d) { return d.total; })]);
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (that.height + 10) + ")")
      .call(function (sel) {
        var xA = xAxis(sel);
        sel.each(function () {
          var tick = this.children;
          for(var i=0;i<tick.length - 1;i++) {
            d3.select(tick[i].children[1]).remove();
            d3.select(tick[i]).append("circle")
              .attr("cx",0)
              .attr("cy",10)
              .attr("r",10)
              .attr("fill","#dadada")
              .on("mouseover",function (d) {
                var txt_g = svg.append("g")
                  .attr("transform","translate(0," + (that.height - 20) + ")");
                var txt_width = 0;
                var id = "column_labeTitle";
                var label;
                var column_labeTitle = document.body.querySelector("#"+id);
                if(!column_labeTitle){
                  column_labeTitle = document.createElement("div");
                  column_labeTitle.className = id;
                  column_labeTitle.id = id;
                  document.body.appendChild(column_labeTitle);
                  label = document.createElement("label");
                  column_labeTitle.appendChild(label);
                }else{
                  label = column_labeTitle.querySelector("label");
                }
                column_labeTitle.style.display = "block";
                label.innerHTML = d;
                column_labeTitle.style.left = (event.x + 5) + "px";
                column_labeTitle.style.top = event.y + "px";
              })
              .on("mouseout",function (d) {
                if(document.body.querySelector("#column_labeTitle"))
                  document.body.querySelector("#column_labeTitle").style.display="none";
              });
          }
        });
        return xA;
      });
    var state = svg.selectAll(".state")
      .data(dataList_temp)
      .enter().append("g")
      .attr("class", "g")
      .attr("id",function(d){
        return "rect_" + d.name;
      })
      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });
    state.selectAll("rect")
      .data(function(d) { return d.ages; })
      .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) {
        return that.get_img(d.name)[2];
      });
    state.append("g")
      .attr("transform", function(d) { return "translate(" + (x(dataList_temp[0].name)-5) + ",0)"; })
      .append("text")
      .attr("class",that.params.fontClass || "emailSort")
      .attr("font-size","2rem")
      .attr("transform","translate(" + (that.margin.left + 6) + "," + that.margin.top + ")")
      .attr("y",function(d){
        return this.parentNode.parentNode.children[this.parentNode.parentNode.children.length-2].getAttribute("y") - 25;
      })
      .text(function(d){
        return d.total;
      });
    this.init_tuli();
  }

  /**
   * 清空。
   */
  clear(){
    this.svg.selectAll("*").remove();
    this.dataList = [];
  }
}
export default stacked_Column;
