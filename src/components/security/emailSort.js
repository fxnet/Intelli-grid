/**
 * 邮件监测数据排名。
 * @param svg
 * @param params
 */

import d3 from "../../../static/js/common/d3.min";
import Enumerable from "linq";

class emailSort {
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
    svg = svg.attr("width", this.params.width)
      .attr("height", this.params.height);
    this.svg = svg;
  }

  init(emailList) {
    this.svg.selectAll("*").remove();
    var that = this;
    var max_height = Enumerable.from(emailList).max("$.count");

    // 画布周边的空白。
    var padding = {left: 0, right: 0, top: 50, bottom: 40};
    this.padding = padding;

    // 定义一个数组。
    var dataset = emailList;

    // x轴的比例尺。
    var xScale = d3.scale.ordinal()
      .domain(d3.range(dataset.length))
      .rangeRoundBands([0, this.params.width - padding.left - padding.right]);

    // y轴的比例尺。
    var yScale = d3.scale.linear()
      .domain([0,max_height])
      .range([this.params.height - padding.top - padding.bottom, 0]);

    // 定义x轴。
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

    // 定义y轴。
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left");

    // 矩形之间的空白。
    var rectPadding = this.params.rectPadding;

    // 添加矩形元素。
    var rects = this.svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("transform","translate(" + padding.left + "," + padding.top + ")")
      .attr("fill",function(d,i){
        if(that.params.rectColor)
          return that.params.rectColor
        else
          return i % 2 == 0 ? '#d49d6b' : '#808080';
      })
      .attr("x", function(d,i){
        return xScale(i) + rectPadding/2;
      } )
      .attr("y",function(d){
        return yScale(d.count) - 10;
      })
      .attr("width", xScale.rangeBand() - rectPadding )
      .attr("height", function(d){
        return that.params.height - padding.top - padding.bottom - yScale(d.count);
      })
      .attr("rx", that.params.rect_radius)

    // 添加文字元素。
    var texts = this.svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class",that.params.fontClass || "emailSort")
      .attr("transform","translate(" + padding.left + "," + padding.top + ")")
      .attr("font-size","2rem")
      .attr("x", function(d,i){
        return xScale(i) + rectPadding /2;
      } )
      .attr("y",function(d){
        return yScale(d.count) - 40;
      })
      .attr("dx",function(){
        return (xScale.rangeBand() - rectPadding)/2;
      })
      .attr("dy",function(d){
        return 20;
      })
      .text(function(d){
        return d.count;
      });

    // 判断当前柱状图类型 type == "font" 文字型 否则 图片型。
    if(that.params.type === "font"){
      //添加文字元素
      this.svg.selectAll()
        .data(dataset)
        .enter()
        .append("text")
        .attr("class",that.params.fontClass_Bottom || "emailSort_font")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("font-size","12px")
        .attr("x", function(d,i){
          return xScale(i) + rectPadding /2;
        } )
        .attr("y",function(d){
          if(that.params.fontClass_Bottom === 'emailSort_font_small_bottom')
            return that.params.height - 110;
          else
            return that.params.height - 90;
        })
        .attr("dx",function(){
          return (xScale.rangeBand() - rectPadding)/2;
        })
        .attr("dy",function(d){
          return 20;
        })
        .text(function(d) {
          return d.mailProvider || d.departmentName;
        });
    }else{
      // 添加图片元素。
      var texts2 = this.svg.selectAll()
        .data(dataset)
        .enter()
        .append("image")
        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
        .attr("x", function(d,i){
          var jian_x = -1;
          switch (d.mailProvider){
            case "QQ":
              jian_x = -1;
              break;
            case "126":
              jian_x = -1;
              break;
            case "163":
              jian_x = -1;
              break;
            case "Outlook":
              jian_x = -1;
              break;
            case "other":
              jian_x = -4;
              break;
          }
          return xScale(i) + rectPadding / 2 - jian_x;
        } )
        .attr("y",function(d){
          if(d.mailProvider == "Outlook")
            return that.params.height - 90;
          else
            return that.params.height - 93;
        })
        .attr("width",function(d){
            return 30;
        })
        .attr("height",15)
        .attr("xlink:href",function(d){
          if(d.mailProvider === "other")
            return "../../../static/img/email/mail_"+d.mailProvider+".svg";
          else
            return "../../../static/img/email/mail_"+d.mailProvider+".png";
        });
      }
  }

  /**
   * 修改。
   * @param emailList
   */
  change(emailList){
    var that = this;
    var padding = this.padding;
    var datList = Enumerable.from(emailList);
    var max_height = datList.max("$.count");

    // y轴的比例尺。
    var yScale = d3.scale.linear()
      .domain([0,max_height])
      .range([this.params.height - padding.top - padding.bottom, 0]);
    var rects = this.svg.selectAll("rect")
      .transition()
      .duration(this.params.effectTime || 1000)
      .attr("y",function(d){
        var item = datList.where("$.departmentName=='"+d.departmentName+"'").toArray()[0];
        if(item) {
          d.count = item.count;
        }
        return yScale(d.count)- 10;
      })
      .attr("height",function(d,i){
          return that.params.height - padding.top - padding.bottom - yScale(d.count);
      })
      .ease('linear');

    this.svg.selectAll("text."+this.params.fontClass)
      .transition()
      .duration(1000)
      .attr("y",function(d){
        return yScale(d.count) - 40;
      })
      .text(function (d) {
        var item = datList.where("$.departmentName=='"+d.departmentName+"'").toArray()[0];
        if(item) {
          d.count = item.count;
        }
        return d.count;
      })
      .ease('linear');
  }
}
export default emailSort;
