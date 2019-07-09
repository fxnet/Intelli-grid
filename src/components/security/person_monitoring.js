/**
 * 邮件监测数据排名
 * author by zhangqiang
 * @param svg 画布
 * @param params 参数
 */

import d3 from "../../../static/js/common/d3.min";
import Enumerable from "linq";

class person_monitoring {
  constructor(svg, params) {
    this.params = params || {};
    var params = {
      width: 350,
      height: 400,
      g_width: 150,
      g_height: 150,
      img_width:35,
      img_height:103,
      padding:{left: 10, top: 150 }
    };
    for (var one in params) {
      if (!this.params[one])
        this.params[one] = params[one];
    }
    svg = svg.attr("width", this.params.width)
      .attr("height", this.params.height);
    this.svg = svg;
  }

  init(dataList,parent_event){
    var that = this;
    this.parent_event = parent_event;
    this.dataList = dataList;
    this.query_nodes = Enumerable.from(this.dataList);
    var hor_width = parseInt((this.params.width - this.params.padding.left) / this.params.g_width) ;
    var line_count = 0;
    var hor_count = 0;

    this.svg.selectAll("*").remove();
    var g = this.svg.selectAll("g")
      .data(dataList)
      .enter()
      .append("g")
      .attr("id", function (d) {
        return "group_" + d.employeeId;
      })
      .attr("transform", function (d, i) {
        var x = that.params.padding.left + (i * that.params.g_width);
        var y = that.params.padding.top + hor_count * that.params.g_height;
        if (i >= hor_width) {
          if (i % hor_width === 0) {
            line_count = 0;
            hor_count++;
          }
          x = that.params.padding.left + (line_count * that.params.g_width);
          y = that.params.padding.top + hor_count * that.params.g_height;
          line_count++;
        }
        d.g_x = x;
        d.g_y = y;
        return "translate(" + x + "," + y + ")"
      });
    var persion_y = 10;
    g.append("image")
      .attr("width", that.params.img_width)
      .attr("height", that.params.img_height)
      .attr("id","man")
      .attr("x", (that.params.g_width - that.params.img_width) / 2)
      .attr("y", persion_y + 5)
      .attr("xlink:href", function(d,i){
        if(d.type){
          return "../../../static/img/svg/status/iconfont_man_"+d.type+".svg"
        }else{
          return "../../../static/img/svg/status/iconfont_man.svg";
        }
      })
      .on("click",function(d){
        if(d.type === "_danger") {
          that.params.handle_data(d);
        }
        /*if(d.type === "_danger") {
          d.type = "_security";
          d.status = 1;
          this.setAttribute("href", "../../../static/img/svg/status/iconfont_man_security.svg")
          that.svg.select("g#man_tip_"+d.employeeId).remove();
        }*/
      })
      .on("mouseover",function (d) {
        if("_danger" !== d.type) return;
        d.employeeIps = d.employeeIps || [];
        var ip = d.employeeIps.join("<br>");
        var text_width = document.querySelector("#text_width");
        var label;
        if(!text_width){
          text_width = document.createElement("div");
          text_width.className = "text_width";
          text_width.id = "text_width";
          text_width.style.position = "fixed";
          document.body.appendChild(text_width);
          label = document.createElement("label");
          text_width.appendChild(label);
        }else{
          label = text_width.querySelector("label");
        }
        text_width.style.display = "block";
        label.innerHTML = ip;
        text_width.style.left = (event.x + 5) + "px";
        text_width.style.top = (event.y) + "px";
      }).on("mouseout",function (d) {
        if(document.querySelector("#text_width"))
          document.querySelector("#text_width").style.display = "none";
      });

    g.append("line")
      .attr("x1", 0)
      .attr("y1", that.params.img_height + 12)
      .attr("x2", that.params.padding.left + that.params.g_width - that.params.padding.left)
      .attr("y2", that.params.img_height + 12)
      .style("opacity",0.2)
      .style("stroke-width",2)
      .style("stroke", function (d, i) {

          return "#3f3f3f";
      });

    g.append("line")
      .attr("x1", that.params.padding.left + that.params.g_width - that.params.padding.left)
      .attr("y1", 16)
      .attr("x2", that.params.padding.left + that.params.g_width - that.params.padding.left)
      .attr("y2", that.params.g_height + 15)
      .style("opacity",0.2)
      .style("stroke-width",2)
      .style("stroke", function (d, i) {
        var count = i + 1;
        if (count >= hor_width && count % hor_width === 0) {
          return "";
        } else {
          return "#3f3f3f"
        }
      });

    var left = 5;
    var opacity = 0.6;
    //folder
    g.append("image")
      .attr("x", function (d) {
        d.folder = {};
        d.folder.point = { x: left + 2 };
        return d.folder.point.x;
      })
      .attr("y", function (d) {
        d.folder.point.y = 66 + persion_y;
        return d.folder.point.y;
      })
      .attr("width",12)
      .attr("id","folder")
      .style("opacity",opacity)
      .attr("xlink:href", "../../../static/img/svg/status/iconfont_folder_security.svg");

    //disk
    g.append("image")
      .attr("x", function (d) {
        d.disk = {};
        d.disk.point = { x: left + 10 };
        return d.disk.point.x;
      })
      .attr("y", function (d) {
        d.disk.point.y = 40 + persion_y;
        return d.disk.point.y;
      })
      .attr("width",15)
      .attr("id","disk")
      .style("opacity",opacity)
      .attr("xlink:href", "../../../static/img/svg/status/iconfont_disk_security.svg");

    //browser
    g.append("image")
      .attr("x", function (d) {
        d.browser = {};
        d.browser.point = { x: left + 33 };
        return d.browser.point.x;
      })
      .attr("y", function (d) {
        d.browser.point.y = 20 + persion_y;
        return d.browser.point.y;
      })
      .attr("width",12)
      .attr("id","browser")
      .style("opacity",opacity)
      .attr("xlink:href", "../../../static/img/svg/status/iconfont_browser_security.svg")
      .on("click",function (d) {
        that.parent_event.open_man_win("browse",event,d.employeeId);
      });

    //email
    g.append("image")
      .attr("x", function (d) {
        d.mail = {};
        d.mail.point = { x: left + that.params.g_width - 35 };
        return d.mail.point.x;
      })
      .attr("y", function (d) {
        d.mail.point.y = 40 + persion_y;
        return d.mail.point.y;
      })
      .attr("width",12)
      .attr("id","mail")
      .style("opacity",opacity)
      .attr("xlink:href", "../../../static/img/svg/status/iconfont_mail_security.svg")
      .on("click",function (d) {
        that.parent_event.open_man_win("email",event,d.employeeId);
      });

    //qq
    g.append("image")
      .attr("x", function (d) {
        d.qq = {};
        d.qq.point = { x: left + that.params.g_width - 25 };
        return d.qq.point.x;
      })
      .attr("width",12)
      .attr("id","qq")
      .attr("y", function (d) {
        d.qq.point.y = 66 + persion_y;
        return d.qq.point.y;
      })
      .style("opacity",opacity)
      .attr("xlink:href", function(d){
        var onLine_Type = "";
        if(d.imOnlineStatus == 1)
          onLine_Type = "_green";
        return "../../../static/img/svg/status/iconfont_qq" + onLine_Type + ".svg"
      })
      .on("click",function (d) {
        that.parent_event.open_man_win("qq",event,d.employeeId);
      });
  }

  /**
   * 获取攻击数据
   * @param askList
   */
  get_ask(askList){
    var that = this;
    if(that.agv_invert){
      clearInterval(that.agv_invert);
      that.old_askList = undefined;
    }
    if(!that.old_askList){
      that.old_askList = askList;
      that.ask_agv_count = that.old_askList.length / 5;
      if(that.ask_agv_count < 1) {
        that.ask_agv_count = 1;
      }
      that.agv_invert = setInterval(function () {
        if(that.old_askList.length === 0){
          that.old_askList = undefined;
          clearInterval(that.agv_invert);
          that.agv_invert = undefined;
          return;
        }
        askList = that.old_askList.slice(0,that.ask_agv_count)
        that.old_askList.splice(0,that.ask_agv_count);
        clearTimeout(that.bianse_timeout);
        start_ask(askList);
      },1800);
    }
    function start_ask(askList) {
      for (var i = 0; i < askList.length; i++) {
        var item = askList[i];
        var source = that.query_nodes.where("$.employeeId==" + item.employeeId).toArray()[0];
        if (!source) continue;
        var nowManStatus = source.status;
        for (var one in item) {
          source[one] = item[one];
        }
        /*if (nowManStatus == 2) {
          source.status = 2;
          item.status = 2;
        }*/
        item.askObj = [];
        item.effect_arr = [];
        item.effect_arr.push({name:"mail",effect:item.mailEffect});
        item.effect_arr.push({name:"disk",effect:item.copyFileEffect});
        item.effect_arr.push({name:"folder",effect:item.fileEffect});
        item.effect_arr.push({name:"qq",effect:item.imEffect});
        item.effect_arr.push({name:"browser",effect:item.internetEffect});
        if (item.mailStatus !== undefined) {
          item.askObj.push({name: 'mail', type: item.mailStatus === 0 ? "" : item.mailStatus === 2 ? "_danger" : "_security"});
        }
        if (item.copyFileStatus !== undefined) {
          item.askObj.push({name: 'disk', type: item.copyFileStatus === 0 ? "" : item.copyFileStatus === 2 ? "_danger" : "_security"});
        }
        if (item.fileStatus !== undefined) {
          item.askObj.push({name: 'folder', type: item.fileStatus === 0 ? "" : item.fileStatus === 2 ? "_danger" : "_security"});
        }
        if (item.imOnlineStatus == 0) {
          item.askObj.push({name: 'qq', type: "",imOnlineStatus:item.imOnlineStatus});
        }else {
          var type = "";
          if (item.imStatus === 2) {
            type = "_danger";
          }
          else {
            type = "_security";
          }
          item.askObj.push({name: 'qq', type: type,imOnlineStatus:item.imOnlineStatus});
        }

        if (item.internetStatus !== undefined) {
          item.askObj.push({name: 'browser', type: item.internetStatus === 0 ? "" : item.internetStatus === 2 ? "_danger" : "_security"});
        }
        switch (item.status) {
          case 0:
            source.type = "";
            break;
          case 1:
            source.type = "_security";
            break;
          case 2:
            source.type = "_danger";
            break;
        }

        var g = that.svg.selectAll("g#group_" + item.employeeId);
        g.select("image#man").attr("xlink:href", "../../../static/img/svg/status/iconfont_man" + source.type + ".svg")
          .style("opacity", "0.3")
          .transition()
          .duration(2000)
          .style("opacity", "1");
        var opacity = 0.6;
        for (var j = 0; j < item.askObj.length; j++) {
          var askObj_par = item.askObj[j];
          if (askObj_par.type!==undefined) {
              g.select("image#" + askObj_par.name)
                .attr("xlink:href", "../../../static/img/svg/status/iconfont_" + askObj_par.name + askObj_par.type + ".svg")
                .transition()
                .duration(1000)
                .style("opacity", "" === askObj_par.type ? opacity : 1)
                .transition()
                .duration(1000)
                .style("opacity", "" === askObj_par.type ? opacity : 1);
          }
        }
        for (var j = 0; j < item.effect_arr.length; j++) {
          var askObj_par = item.effect_arr[j];
          if(askObj_par.effect > -1){
            var color = "rgba(255, 76, 98, 0.5)";
            if (askObj_par.effect === 1)
              color = "rgba(45, 255, 208, 0.5)";
            /*攻击信息*/
            g.append("circle")
              .style("opacity", 1)
              .attr("cx", source[askObj_par.name].point.x + 10)
              .attr("cy", source[askObj_par.name].point.y + 10)
              .attr("r", 10)
              .attr("fill", color)         //给各圆填充黄色
              .attr("stroke", color)       //给各圆边涂成橘黄
              .attr("stroke-width", function (d) { //按比例设置边的厚度
                return d / 2;
              })
              .transition()
              .duration(2000)
              .style("r", 30).style("opacity", 0)
              .remove();
          }
        }

      }
    }
  }

  change_status(askList){
    var that = this;
    for (var i = 0; i < askList.length; i++) {
      var item = askList[i];
      var source = that.query_nodes.where("$.employeeId==" + item.employeeId).toArray()[0];
      if (!source) continue;
      var nowManStatus = source.status;
      for (var one in item) {
        source[one] = item[one];
      }
      /*if (nowManStatus == 2) {
        source.status = 2;
        item.status = 2;
      }*/
      item.askObj = [];
      if (item.mailStatus !== undefined) {
        item.askObj.push({name: 'mail', type: item.mailStatus === 0 ? "" : item.mailStatus === 2 ? "_danger" : "_security"});
      }
      if (item.copyFileStatus !== undefined) {
        item.askObj.push({name: 'disk', type: item.copyFileStatus === 0 ? "" : item.copyFileStatus === 2 ? "_danger" : "_security"});
      }
      if (item.fileStatus !== undefined) {
        item.askObj.push({name: 'folder', type: item.fileStatus === 0 ? "" : item.fileStatus === 2 ? "_danger" : "_security"});
      }
      if (item.imOnlineStatus == 0) {
        item.askObj.push({name: 'qq', type: "",imOnlineStatus:item.imOnlineStatus});
      }else {
        var type = "";
        if (item.imStatus === 2) {
          type = "_danger";
        }
        else {
          type = "_security";
        }
        item.askObj.push({name: 'qq', type: type,imOnlineStatus:item.imOnlineStatus});
      }

      if (item.internetStatus !== undefined) {
        item.askObj.push({name: 'browser', type: item.internetStatus === 0 ? "" : item.internetStatus === 2 ? "_danger" : "_security"});
      }
      switch (item.status) {
        case 0:
          source.type = "";
          break;
        case 1:
          source.type = "_security";
          break;
        case 2:
          source.type = "_danger";
          break;
      }

      var g = that.svg.selectAll("g#group_" + item.employeeId);
      g.select("image#man").attr("xlink:href", "../../../static/img/svg/status/iconfont_man" + source.type + ".svg")
        .style("opacity", "1");
      var opacity = 0.6;
      for (var j = 0; j < item.askObj.length; j++) {
        var askObj_par = item.askObj[j];
        if (askObj_par.type!==undefined) {
          /*if(askObj_par.name === "qq"){
            g.select("image#" + askObj_par.name)
              .attr("xlink:href", "../../../static/img/svg/status/iconfont_" + askObj_par.name + askObj_par.type + ".svg")
              .transition()
              .duration(1000)
              .style("opacity", "" === askObj_par.type ? opacity : 1)
              .transition()
              .duration(1000)
              .style("opacity", "" === askObj_par.type ? opacity : 1);
          }else{*/
          g.select("image#" + askObj_par.name)
            .attr("xlink:href", "../../../static/img/svg/status/iconfont_" + askObj_par.name + askObj_par.type + ".svg")
            .style("opacity", "" === askObj_par.type ? opacity : 1);


          /*if (!(askObj_par.name === "qq" && item.imOnlineStatus === 1)) {
            (function (g, askObj_par) {
              that.bianse_timeout = setTimeout(function () {
                g.select("image#" + askObj_par.name)
                  .attr("xlink:href", function (d) {
                    if (d.name === "qq" && d.imOnlineStatus === 1) {
                      return "../../../static/img/svg/status/iconfont_" + askObj_par.name + "_green.svg";
                    } else{
                      if("_danger" === askObj_par.type){
                        return "../../../static/img/svg/status/iconfont_" + askObj_par.name + "_danger.svg";
                      }else
                        return "../../../static/img/svg/status/iconfont_" + askObj_par.name + ".svg";
                    }
                  })
                  .style("opacity", "_danger" === askObj_par.type ? 1 : opacity);
              }, 1700);
            })(g, askObj_par);
          }*/


          /*if(askObj_par.type){
            var color = "rgba(255, 76, 98, 0.5)";
            if (askObj_par.type === "_security")
              color = "rgba(45, 255, 208, 0.5)";
            /!*攻击信息*!/
            g.append("circle")
              .style("opacity", 1)
              .attr("cx", source[askObj_par.name].point.x + 10)
              .attr("cy", source[askObj_par.name].point.y + 10)
              .attr("r", 10)
              .attr("fill", color)         //给各圆填充黄色
              .attr("stroke", color)       //给各圆边涂成橘黄
              .attr("stroke-width", function (d) { //按比例设置边的厚度
                return d / 2;
              })
              .transition()
              .duration(2000)
              .style("r", 30).style("opacity", 0)
              .remove();
          }*/
        }
      }
    }
  }

  /**
   * 打开业务处理界面
   * @param model
   * @param type
   */
  open_win(model,type){

  }

  /**
   * 修改小人周边图标状态
   * @param id
   * @param type
   */
  change_other_status(id,type){
    var that = this;
    var g = that.svg.selectAll("g#group_" + id);
    g.select("image#" + type)
      .attr("xlink:href", "../../../static/img/svg/status/iconfont_" + type + "_security.svg")
      .style("opacity", 1);
  }

  /**
   * 修改小人图标状态
   * @param id
   * @param type
   */
  change_man_status(id,type){
    var that = this;
    var g = that.svg.selectAll("g#group_" + id);
    var man_type = "";
    switch (type) {
      case 0:
        man_type = "";
        break;
      case 1:
        man_type = "_security";
        break;
      case 2:
        man_type = "_danger";
        break;
    }
    g.select("image#man").attr("xlink:href", "../../../static/img/svg/status/iconfont_man" + man_type + ".svg")
      .style("opacity", man_type === "" ? "0.6" : "1");
  }
}


export default person_monitoring;
