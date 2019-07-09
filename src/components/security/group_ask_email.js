/**
 * 企业攻击邮箱。
 * @param svg
 * @param params
 */

import d3 from "../../../static/js/common/d3.min";
import Enumerable from "linq";

class group_ask_email {
  constructor (svg, params) {
    // svg宽度和高度。
    this.params = params || {};
    params.email = params.email || {}
    this.params.width = params.width || 800;
    this.params.height = params.height || 700;
    this.params.padding = params.padding || {left: 20};
    this.params.email_x = params.email_x || 450;
    this.radius = Math.min(this.params.width, this.params.height) / 2;
    this.params.style = params.style || {}
    this.params.style.group = params.style.group || {};
    this.params.style.group.fontLeft = 25;
    this.params.style.group.fontTop = 10;
    this.params.style.email = params.style.email || {};
    this.params.style.ask = params.style.ask || {};
    this.params.style.lineLeft = params.lineLeft || 50;
    this.params.style.email.paddingTop = params.email.paddingTop || 20;
    this.params.style.email.paddingLeft = params.email.paddingLeft || 0;
    this.Open_Win = params.Open_Win;
    var svg = svg.attr("width", this.params.width)
      .attr("height", this.params.height);
    this.svg = svg;
  }

  /**
   * 初始化。
   * @param groupList
   * @param emailList
   */

  init (groupList, emailList) {
    var that = this;
    that.groupList = groupList;
    that.emailList = emailList;

    /**
     * 加载分组
     * @param dataList
     */
    function init_group(dataList) {
      var big_group = ['国网总部','国网东北分部','国网西北分部','国网华北分部','国网总部','国网华东分部','国网华中分部','国网西南分部'];
      dataList.children.splice(0,0,{});
      dataList.children.splice(0,0,{});
      dataList.children.push({});
      dataList.children.push({});
      var g = that.svg.append("g");

      var rads = Math.min(that.params.width + 420, that.params.height + 125) / 2;
      var partition = d3.layout.partition()
        .sort(null)
        .size([-Math.PI, rads * rads])
        .value(function (d) {
          return 1;
        });
      var arc = d3.svg.arc()
        .startAngle(function (d) {
          return d.x;
        })
        .endAngle(function (d) {
          return d.x + d.dx;
        })
        .innerRadius(function (d) {
          return Math.sqrt(d.y);
        })
        .outerRadius(function (d) {
          return Math.sqrt(d.y + d.dy);
        });
      var nodes = partition.nodes(dataList);
      var arcs = g.selectAll("g")
        .data(nodes)
        .enter().append("g")
        .attr("id",function (d) {
          return "group_" + d.id;
        });
      arcs.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", function (d, i) {
          var po = arc.centroid(d);
          if(d.paddingTop){
            po[1] += d.paddingTop;
          }
          d.point = {x: po[0], y: po[1]};
          return "translate(" + po + ")";
        })
        .attr("class",function(d){
          if(d.hasHeadOffice){
            return "group_ask_font_class_zong";
          }else{
            return "group_ask_font_class_default";
          }
        })
        .attr("x",function(d){
          if(d.group==="总部")
            return 8;
          if(d.hasHeadOffice) {
            return -10;
          }
        })
        .attr("id", function (data) {
          return "group_" + data.id;
        })
        .text(function (d) {
          return d.group;
        });

      arcs.append("image")
        .attr("transform", function (d, i) {
          var po = arc.centroid(d);
          d.point = {x: po[0] + 35, y: po[1] - 5 + d.paddingTop};
        })
        .attr("x", function(d,i){
          var jian_x = (d.group||"").length * 5 - 25;
          if(d.hasHeadOffice)
            jian_x = 0;
          d.img_point = {x:d.point.x + jian_x + 20};
          return d.point.x + jian_x;
        } )
        .attr("y",function(d){
          if(!d.group) return;
          var y = 0;
          if(d.hasHeadOffice)
            y = d.point.y - 10;
          else
            y = d.point.y - 7;
          d.img_point.y = y + 30;
          return y;

        })
        .attr('width',function(d){
          if(d.hasHeadOffice)
            return 18;
          else
            return 15;
        })
        .attr("xlink:href",function(d){
          if(d.group){
            if(d.hasHeadOffice)
              return "../../../static/img/svg/iconfont_company_hq.svg";
            else
              return "../../../static/img/svg/iconfont_company.svg";
          }
        });

      arcs.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", function (d, i) {
          if(!d.group) return;
          var po = arc.centroid(d);
          if(d.group==="总部")
            po[0]-= d.group.length * 12;
          else if(d.hasHeadOffice)
            po[0] -= d.group.length * 7 + 35;
          else
            po[0] -= d.group.length * 6 + 15;
          po[1] = po[1] + d.paddingTop + 1;
          d.point_text_security = po;
          return "translate(" + po + ")";
        })
        .attr("id","text_security")
        .attr("fill","#8ee27d")
        .text(function(d){
          if(d.group)
            return 0;
          else
            return "";
        });

      arcs.append("text")
        .attr("id","text_line")
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
          if(!d.group) return;
          var po = arc.centroid(d);
          if(d.group==="总部")
            po[0]-= d.group.length * 17;
          else if(d.hasHeadOffice)
            po[0] -= d.group.length * 7 + 45;
          else
            po[0] -= d.group.length * 6 + 25;
          po[1] = po[1] + d.paddingTop + 1;

          d.point_line = po;
          return "translate(" + po + ")";
        })
        .attr("fill","white")
        .text(function (d) {
          if(!d.group) return "";
          return "/";
        });

      arcs.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", function (d, i) {
          if(!d.group) return;
          var po = arc.centroid(d);
          if(d.group==="总部")
            po[0]-= d.group.length * 22;
          else if(d.hasHeadOffice)
            po[0] -= d.group.length * 7 + 55;
          else
            po[0] -= d.group.length * 6 + 35;
          po[1] = po[1] + d.paddingTop + 1;

          d.point_text_danger = po;
          return "translate(" + po + ")";
        })
        .attr("id","text_danger")
        .attr("fill",function(d){
          return "#8ee27d";
        })
        .text(function(d){
          if(d.group)
            return 0;
          else
            return "";
        });

      that.group_arcs = arcs;

      // 记录左边分组的位置。
      var group_x =  that.radius + 100;
      var group_y = that.radius;
      that.group_x = group_x + 60;
      that.group_y = group_y

      g.attr("transform", "translate(" + group_x + "," + that.radius + ")");
    }

    /**
     * 加载邮箱。
     * @param dataList
     */
    function init_email(dataList) {
      dataList.children.splice(0,0,{});
      dataList.children.push({});
      var g = that.svg.append("g");
      var partition = d3.layout.partition()
        .sort(null)
        .size([-Math.PI, that.radius * that.radius])
        .value(function (d) {
          return 1;
        });

      var arc = d3.svg.arc()
        .startAngle(function (d) {
          return d.x;
        })
        .endAngle(function (d) {
          return d.x + d.dx;
        })
        .innerRadius(function (d) {
          return Math.sqrt(d.y);
        })
        .outerRadius(function (d) {
          return Math.sqrt(d.y + d.dy);
        });

      partition.size([Math.PI, that.radius * that.radius]);

      var nodes = partition.nodes(dataList);
      var arcs = g.selectAll()
        .data(nodes)
        .enter().append("g")
        .attr("id",function (d) {
          return "email_" + d.id;
        });

      // 添加图片元素。
      arcs.append("image")
        .attr("transform", function (d, i) {
          var po = arc.centroid(d);
          d.paddingLeft = 0;
          d.point = {x: po[0] - d.paddingLeft, y: po[1]};
        })
        .attr("x", function(d,i){
          var x = d.point.x + d.paddingLeft;
          d.img_point = {x:x};
          switch(d.email){
            case "mail_126":
              d.point.x -= 30
              d.img_point.x += 35;
              break;
            case "mail_163":
              d.point.x -= 40
              d.img_point.x += 35;
              break;
            case "mail_qq":
              d.point.x -= 40
              d.img_point.x += 30;
              break;
            case "mail_outlook":
              d.point.x -= 40
              d.img_point.x += 25;
              break;
            case "mail_ali":
              d.point.x -= 25;
              d.img_point.x += 30;
              break;
            case "mail_other":
              d.point.x -= 0;
              d.img_point.x += 25;
              break;
          }
          return x;
        } )
        .attr("y",function(d){
          var y = d.point.y - 10;
          d.img_point.y = y;
          switch(d.email){
            case "mail_126":
              d.point.y -= 10;
              d.img_point.y += 0;
              break;
            case "mail_163":
              d.point.y -= 20;
              d.img_point.y -= 5;
              break;
            case "mail_qq":
              d.point.y -= 30;
              d.img_point.y -= 5;
              break;
            case "mail_outlook":
              d.point.y -= 30;
              d.img_point.y -= 5;
              break;
            case "mail_ali":
              d.point.y -= 40;
              d.img_point.y -= 10;
              break;
            case "mail_other":
              d.point.y -= 60;
              d.img_point.y -= 5;

              break;
          }
          return y;
        })
        .attr("width",function(d){
          if(d.email === "mail_other"){
            return 55;
          }
        })
        .attr("xlink:href",function(d,i){
          if(d.email){
            if(d.email === 'mail_other')
              return "../../../static/img/email/"+d.email+".svg";
            else
              return "../../../static/img/email/"+d.email+".png";
          }
        });

      arcs.append("text")
        .attr("x", function(d,i){
          var number = 120;
          switch(d.email){
            case "mail_qq":
              number =  155;
              break;
            case "mail_outlook":
              number =  100;
              break;
            case "mail_ali":
              number =  100;
              break;
            case "mail_other":
              number =  65;
              break;
          }
          d.text_point = {x:d.point.x + number  + d.paddingLeft};
          return d.point.x + number + d.paddingLeft;
        })
        .attr("y",function(d){
          var number = 20;
          switch(d.email){
            case "mail_outlook":
              number =  40;
              break;
            case "mail_other":
              number =  79;
              break;
            case "mail_ali":
              number =  45;
              break;
            case "mail_qq":
              number =  35;
              break;
            case "mail_163":
              number =  28;
              break;
          }
          d.text_point.y = d.point.y + number;
          if(number === 75){
            return d.point.y + number + 10;
          }else {
            return d.point.y + number;
          }
        })
        .attr("class","email_font")
        .text(function(d){
          return d.name;
        });
      arcs.append("text")
        .attr("x", function(d,i){
          var number = 80;
          switch(d.email){
            case "mail_qq":
              number =  115;
              break;
            case "mail_outlook":
              number =  65;
              break;
            case "mail_ali":
              number =  70;
              break;
            case "mail_other":
              number =  65;
              break;
          }
          return d.text_point.x;
        } )
        .attr("y",function(d){
          return d.text_point.y + 20;
        })
        .attr("class","email_desc")
        .text(function(d){
          return d.desc;
        });

      arcs.append("line")
        .attr("x1", function(d){
          d.text_line_point = {x:110};
          switch(d.email){
            case "mail_126":
              d.text_line_point.x = 80;
              break;
            case "mail_163":
              d.text_line_point.x = 80;
              break;
            case "mail_qq":
              d.text_line_point.x =  78;
              break;
            case "mail_outlook":
              d.text_line_point.x =  120;
              break;
            case "mail_ali":
              d.text_line_point.x =  90;
              break;
            case "mail_other":
              d.text_line_point.x =  90;
              break;
          }
          d.text_line_point.x += d.text_point.x ;
          return d.text_line_point.x;
        })
        .attr("y1", function(d){
          return d.text_point.y - 15;
        })
        .attr("x2", function(d){
          return d.text_line_point.x;
        })
        .attr("y2", function(d){
          return d.text_point.y + 25;
        })
        .style("stroke", "#323232")
        .attr("stroke-width", function(d){
          if(d.name)
            return 2;
          else
            return 0;
        })
        .attr("class","email_line");

      arcs.append("text")
        .attr("x", function(d,i){
          return d.text_line_point.x + 10;
        } )
        .attr("y",function(d){
          return d.text_point.y;
        })
        .attr("id","text_security")
        .attr("fill","#8ee27d")
        .text(function(d){
          if(d.name)
            return 0;
          else
            return "";
        });
      arcs.append("text")
        .attr("x", function(d,i){
          return d.text_line_point.x + 10;
        } )
        .attr("y",function(d){
          return d.text_point.y + 20;
        })
        .attr("id","text_danger")
        .attr("fill",function(d){
          return "#8ee27d";
        })
        .text(function(d){
          if(d.name)
            return 0;
          else
            return "";
        });
      that.email_arcs = arcs;
      var email_x = that.radius -10;
      var email_y = that.radius;
      that.email_x = email_x - 140;
      that.email_y = email_y;
      g.attr("transform", "translate(" + (that.params.width - that.radius - 180) + "," + (that.radius - 20) + ")");
    }

    /**
     * 初始化攻击效果。
     * @param dataList
     * @param emailList
     */
    function init_Animation(dataList, emailList) {
      // 定义线条渐变颜色。
      var a = d3.rgb(30, 30, 30);

      // 红色线条。
      function init_red() {
        var b = d3.rgb(249, 75, 74);
        // 定义一个线性渐变。
        that.defs = that.svg.append("defs");
        that.linearGradient = that.defs.append("linearGradient")
          .attr("id", "linearColor")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        var stop1 = that.linearGradient.append("stop")
          .attr("offset", "0%")
          .style("stop-color", a.toString());
        var stop2 = that.linearGradient.append("stop")
          .attr("offset", "100%")
          .style("stop-color", b.toString());
        that.linearGradient_Rever = that.defs.append("linearGradient")
          .attr("id", "linearColor_rever")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        that.linearGradient_Rever.append("stop")
          .attr("offset", "0%")
          .style("stop-color", b.toString());
        that.linearGradient_Rever.append("stop")
          .attr("offset", "100%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius = that.defs.append("linearGradient")
          .attr("id", "linearColor_radius")
          .attr("x1", "100%")
          .attr("y1", "100%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        that.linearGradient_Radius.append("stop")
          .attr("offset", "0%")
          .style("stop-color", b.toString());
        that.linearGradient_Radius.append("stop")
          .attr("offset", "100%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_Rever = that.defs.append("linearGradient")
          .attr("id", "linearColor_radius_rever")
          .attr("x1", "100%")
          .attr("y1", "100%")
          .attr("x2", "0%")
          .attr("y2", "0%");
        that.linearGradient_Radius_Rever.append("stop")
          .attr("offset", "0%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_Rever.append("stop")
          .attr("offset", "100%")
          .style("stop-color", b.toString());
        that.linearGradient_Radius_circular = that.defs.append("linearGradient")
          .attr("id", "linearColor_radius_circular")
          .attr("x1", "100%")
          .attr("y1", "100%")
          .attr("x2", "0%")
          .attr("y2", "100%");
        that.linearGradient_Radius_circular.append("stop")
          .attr("offset", "0%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_circular.append("stop")
          .attr("offset", "100%")
          .style("stop-color", b.toString());
        that.linearGradient_Radius_circular_Rever = that.defs.append("linearGradient")
          .attr("id", "linearColor_radius_circular_Rever")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "0%")
          .attr("y2", "100%");
        that.linearGradient_Radius_circular_Rever.append("stop")
          .attr("offset", "0%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_circular_Rever.append("stop")
          .attr("offset", "100%")
          .style("stop-color", b.toString());
      }
      init_red();

      // 绿色线条。
      function init_green(){
        var b = d3.rgb(8, 239, 8);
        // 定义一个线性渐变。
        that.defs = that.svg.append("defs");
        that.linearGradient_green = that.defs.append("linearGradient")
          .attr("id", "linearColor_green")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        var stop1 = that.linearGradient_green.append("stop")
          .attr("offset", "0%")
          .style("stop-color", a.toString());
        var stop2 = that.linearGradient_green.append("stop")
          .attr("offset", "100%")
          .style("stop-color", b.toString());
        that.linearGradient_Rever_green = that.defs.append("linearGradient")
          .attr("id", "linearColor_rever_green")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        that.linearGradient_Rever_green.append("stop")
          .attr("offset", "0%")
          .style("stop-color", b.toString());
        that.linearGradient_Rever_green.append("stop")
          .attr("offset", "100%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_green = that.defs.append("linearGradient")
          .attr("id", "linearColor_radius_green")
          .attr("x1", "100%")
          .attr("y1", "100%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        that.linearGradient_Radius_green.append("stop")
          .attr("offset", "0%")
          .style("stop-color", b.toString());
        that.linearGradient_Radius_green.append("stop")
          .attr("offset", "100%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_Rever_green = that.defs.append("linearGradient")
          .attr("id", "linearColor_radius_rever_green")
          .attr("x1", "100%")
          .attr("y1", "100%")
          .attr("x2", "100%")
          .attr("y2", "0%");
        that.linearGradient_Radius_Rever_green.append("stop")
          .attr("offset", "0%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_Rever_green.append("stop")
          .attr("offset", "100%")
          .style("stop-color", b.toString());
        that.linearGradient_Radius_circular_green = that.defs.append("linearGradient")
          .attr("id", "linearColor_radius_circular_green")
          .attr("x1", "100%")
          .attr("y1", "100%")
          .attr("x2", "0%")
          .attr("y2", "100%");
        that.linearGradient_Radius_circular_green.append("stop")
          .attr("offset", "0%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_circular_green.append("stop")
          .attr("offset", "100%")
          .style("stop-color", b.toString());
        that.linearGradient_Radius_circular_Rever_green = that.defs.append("linearGradient")
          .attr("id", "linearColor_radius_circular_Rever_green")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "0%")
          .attr("y2", "100%");
        that.linearGradient_Radius_circular_Rever_green.append("stop")
          .attr("offset", "0%")
          .style("stop-color", a.toString());
        that.linearGradient_Radius_circular_Rever_green.append("stop")
          .attr("offset", "100%")
          .style("stop-color", b.toString());
      }
      init_green();

      // 创建一条直线。
      that.lineFunction = d3.svg.line()
        .x(function (d) {
          return d.x;
        })
        .y(function (d) {
          return d.y;
        })
        .interpolate("linear");
    }

    /**
     * 加载分组攻击邮箱。
     */
    function init_group_ask_email() {
      init_group(groupList);
      init_email(emailList);
      init_Animation(groupList, emailList);
      // 两个图中间虚线。
      that.svg.append("line")
        .attr("x1", that.params.width / 2 - that.params.style.lineLeft)
        .attr("y1", 80)
        .attr("x2", that.params.width / 2 - that.params.style.lineLeft)
        .attr("y2", that.radius * 2 - 80)
        .style("stroke", that.params.style.partingLine || "#979797")
        .attr("stroke-dasharray", "5")
        .attr("fill", "none");
    }
    init_group_ask_email();
  }

  /**
   * 添加攻击动画流行线。
   * @param askList
   */
  get_ask (askList,play_type) {
    var that = this;
    if(that.agv_invert){
      clearInterval(that.agv_invert);
      that.old_askList = undefined;
    }
    if(!that.old_askList){
      that.old_askList = askList;
      that.ask_agv_count = that.old_askList.length / 20;
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
        start_ask();
      },1000);
    }
    function start_ask(){
      if (askList.length > 0) {
        var gorup_ask_email = Enumerable.from(askList).where("$.type==0").toArray(); // 企业攻击邮箱。
        var group_ask_group = Enumerable.from(askList).where("$.type==1").toArray(); // 企业攻击企业。
        var email_ask_group = Enumerable.from(askList).where("$.type==2").toArray(); // 邮箱攻击企业。
        var email_ask_email = Enumerable.from(askList).where("$.type==3").toArray(); // 邮箱攻击邮箱。
        var email_ask_me = Enumerable.from(askList).where("$.type==4&&$.sender>200").distinct("$.sender").toArray(); // 邮箱自己攻击自己。
        var group_ask_me = Enumerable.from(askList).where("$.type==4&&$.sender<200").distinct("$.sender").toArray(); // 企业自己攻击自己。
        that.email_arcs.selectAll("text#text_security")
          .text(function(d){
            if(d.name) {
              var item = Enumerable.from(askList).where("$.receiver==" + d.id).sum("$.count");
              if(!item) return this.innerHTML;
              return parseInt(this.innerHTML) + item;
            }else
              return "";
          });
        that.email_arcs.selectAll("text#text_danger")
          .text(function(d){
            if(d.name) {
              var item = Enumerable.from(askList).where("$.receiver==" + d.id).sum("$.insecurityCount");
              if(!item) return this.innerHTML;
              d.email_danger_count = parseInt(this.innerHTML) + item;
              return parseInt(this.innerHTML) + item;
            }else
              return "";
          })
          .attr("fill",function(d){
            if(d.email_danger_count > 0)
              return "#fa4b4a";
            else
              return "#8ee27d";
          });

        that.group_arcs.selectAll("text#text_security")
          .text(function(d){
            if(d.group) {
              var item = Enumerable.from(askList).where("$.receiver==" + d.id).sum("$.count");
              if(!item) return this.innerHTML;
              d.text_security_count = parseInt(this.innerHTML) + item;
              return parseInt(this.innerHTML) + item;
            }else
              return "";
          })
          .attr("transform", function (d, i) {
            if(!d.group) return;
            var po = JSON.parse(JSON.stringify(d.point_text_security));
            if(d.text_security_count && d.text_security_count.toString().length>1){
              po[0] -= d.text_security_count.toString().length * 3;
              if(d.text_security_count.toString().length > 1){
                po[0] += 3;
              }
            }
            return "translate(" + po + ")";
          });
        that.group_arcs.selectAll("text#text_danger")
          .text(function(d){
            if(d.group) {
              var item = Enumerable.from(askList).where("$.receiver==" + d.id).sum("$.insecurityCount");
              if(!item) return this.innerHTML;
              d.text_danger_count = parseInt(this.innerHTML) + item;
              return parseInt(this.innerHTML) + item;
            }else
              return "";
          })
          .attr("transform", function (d, i) {
            if(!d.group) return;
            var po = JSON.parse(JSON.stringify(d.point_text_danger));
            if((d.text_security_count && d.text_security_count.toString().length>1)){
              po[0] -= d.text_security_count.toString().length * 5;
            }
            if(d.text_danger_count && d.text_danger_count.toString().length>1){
              po[0] -= d.text_danger_count.toString().length * 4;
            }
            return "translate(" + po + ")";
          })
          .attr("fill",function(d){
            if(d.text_danger_count > 0)
              return "#fa4b4a";
            else
              return "#8ee27d";
          });

        that.group_arcs.selectAll("text#text_line")
          .attr("transform",function (d) {
            if(!d.group || !d.point_line) return;
            var po_line = JSON.parse(JSON.stringify(d.point_line));
            if(d.text_security_count && d.text_security_count.toString().length>1)
            po_line[0] -= d.text_security_count.toString().length * 5;
            return "translate(" + po_line + ")";
          });

        // 邮箱自己攻击自己。
        if(email_ask_me.length > 0){
          method_email_ask_me2();
        }
        function method_email_ask_me2(){
          function email_ask_me_line_security_clear(){
            if(that.email_ask_me_line_security_timeout)
              clearTimeout(that.email_ask_me_line_security_timeout);

            that.email_ask_me_line_security_timeout = setTimeout(function () {
              that.svg.selectAll("path[data-name=email_ask_me_line_security]")
                .remove();
            },(that.params.lineTime || 3000) + 1000);
          }
          email_ask_me_line_security_clear();
          function drawArcByRadiusDeg(startX, startY, r, deg, clockwise) {
            var cw = typeof clockwise !== 'undefined' ? clockwise : 1;
            var x = startX - r + r * Math.cos(deg * Math.PI / 180);
            var y = startY + (1 === cw ? 1 : -1) * r * Math.sin(deg * Math.PI / 180);
            var bigOrSmall = deg > 180 ? 1 : 0;
            return "M " + startX + " " + startY + " A " + r + " " + r + " 0 " + bigOrSmall + " " + cw + " " + x + " " + y ;
          }
          for(var i = 0 ;i<email_ask_me.length;i++){
            var source = email_ask_me[i];
            var email_g = that.svg.select("g#email_" + email_ask_me[i].sender);
            var item = Enumerable.from(that.emailList.children).where("$.id==" + email_ask_me[i].sender).toArray()[0];
            if(email_g.select("path#path_deg_"+email_ask_me[i].sender)[0][0]){
              continue;
              //email_g.select("path#path_deg_"+email_ask_me[i].sender).remove();
            }
            var email_g_path = email_g.append("path");
            email_g_path.attr("stroke",function (d) {
                var ask_item = Enumerable.from(email_ask_me).where("$.sender==" + d.id).toArray()[0];
                d.sender = ask_item.sender;
                d.receiver = ask_item.receiver;
                if (ask_item.insecurityCount > 0) {
                    return "url(#" + that.linearGradient_Radius_circular.attr("id") + ")";
                }
                else{
                    return "url(#" + that.linearGradient_Radius_circular_green.attr("id") + ")";
                }
              })
              .attr("fill","transparent")
              .attr("fill-opacity",1)
              .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
              .attr("id","path_deg_" + email_ask_me[i].sender)
              .attr("data-name",function(){
                return that.get_line_dataType(source,"email_ask_me_line",play_type,this);
              })
              .attr("d",function (d) {
                if(d.deg_inver)
                  clearInterval(d.deg_inver);
                var x = d.img_point.x;
                var y = d.img_point.y;
                d.path_deg = 0;
                var r = 30;
                var that = this;
                d.deg_inver = setInterval(function () {
                  if(d.path_deg > 260){
                    clearInterval(d.deg_inver);
                    if(that.getAttribute("data-name") === "email_ask_me_line_security")
                      that.remove();
                  }
                  d.path_deg += 2;
                  that.setAttribute("d",drawArcByRadiusDeg(x, y, r, d.path_deg, 0));
                },10);
                return drawArcByRadiusDeg(x, y, r, d.path_deg, 0);
              });
          }
          that.line_option("email_ask_me_line");
          email_ask_me_line_security_clear();
          that.ask_intercept(email_ask_me,"email_ask_me",email_g,drawArcByRadiusDeg);
        }

        // 企业自己攻击自己。
        if(group_ask_me.length > 0){
          method_group_ask_me2();
        }
        function method_group_ask_me2(){
          function group_ask_me_line_security_clear(){
            if(that.group_ask_me_line_security_timeout)
              clearTimeout(that.group_ask_me_line_security_timeout);

            that.group_ask_me_line_security_timeout = setTimeout(function () {
              that.svg.selectAll("path[data-name=group_ask_me_line_security]")
                .remove();
            },(that.params.lineTime || 3000) + 1000);
          }
          group_ask_me_line_security_clear();

          function method(left,top,progress) {
            var r = 20;
            var degrees = progress * 360;
            var rad = degrees * (Math.PI / 180);
            var x = (Math.sin(rad) * r).toFixed(2);
            var y = -(Math.cos(rad) * r).toFixed(2);
            var lenghty = window.Number(degrees > 180);
            var descriptions = ['M', 0, -r, 'A', r, r, 0, lenghty, 1, x, y];
            return descriptions.join(' ');
          }
          for(var i = 0 ;i<group_ask_me.length;i++){
            var source = group_ask_me[i];
            var email_g = that.svg.select("g#group_" + group_ask_me[i].sender);
            var item = Enumerable.from(that.emailList.children).where("$.id==" + group_ask_me[i].sender).toArray()[0];
            if(email_g.select("path#path_deg_group_"+group_ask_me[i].sender)[0][0]){
              continue;
              //email_g.select("path#path_deg_group_"+group_ask_me[i].sender).remove();
            }
            var email_g_path = email_g.append("path");
            email_g_path.attr("transform",function (d) {
                return 'translate(' + (d.img_point.x ) + ',' + (d.img_point.y) + ')'
              })
              .attr("stroke",function (d) {
                var ask_item = Enumerable.from(group_ask_me).where("$.sender==" + d.id).toArray()[0];
                d.sender = ask_item.sender;
                d.receiver = ask_item.receiver;
                if (ask_item.insecurityCount > 0) {
                  return "url(#" + that.linearGradient_Radius_circular_Rever.attr("id") + ")";
                }
                else{
                  return "url(#" + that.linearGradient_Radius_circular_Rever_green.attr("id") + ")";
                }
              })
              .attr("fill","transparent")
              .attr("fill-opacity",1)
              .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
              .attr("id","path_deg_group_" + group_ask_me[i].sender)
              .attr("data-name",function(){
                return that.get_line_dataType(source,"group_ask_me_line",play_type,this);
              })
              .attr("d",function (d) {
                if(d.deg_inver)
                  clearInterval(d.deg_inver);
                var x = d.img_point.x;
                var y = d.img_point.y;
                d.path_deg = 0;
                var that = this;
                d.deg_inver = setInterval(function () {
                  if(d.path_deg >= 0.9){
                    clearInterval(d.deg_inver);
                    if(that.getAttribute("data-name") === "group_ask_me_line_security")
                      that.remove();
                  }
                  d.path_deg += 0.007;
                  that.setAttribute("d",method(x, y,d.path_deg));
                },10);
                return method(x, y, d.path_deg);
              });
          }
          that.line_option("group_ask_me_line");
          group_ask_me_line_security_clear();
          that.ask_intercept(group_ask_me,"group_ask_me",email_g,method);
        }

        // 邮箱攻击邮箱。
        if(email_ask_email.length>0){
          method_email_ask_email();
        }
        function method_email_ask_email(){
          function email_ask_email_line_security_clear(){
            if(that.email_ask_email_line_security_timeout)
              clearTimeout(that.email_ask_email_line_security_timeout);

            that.email_ask_email_line_security_timeout = setTimeout(function () {
              that.svg.selectAll(".link[data-name=email_ask_email_line_security]")
                .remove();
            },(that.params.lineTime || 3000) + 1000);
          }
          email_ask_email_line_security_clear();

          var cluster = d3.layout.cluster()
            .size([180, that.email_x ])
            .separation(function (a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
          var bundle = d3.layout.bundle();
          var nodes = cluster.nodes(that.emailList);
          var oLinks = map(nodes, email_ask_email);
          var links = bundle(oLinks);

          // 将links中的source和target由名称替换成节点。
          function map(nodes, links) {
            var hash = [];
            for (var i = 0; i < nodes.length; i++) {
              hash[nodes[i].id] = nodes[i];
            }
            var resultLinks = [];
            for (var i = 0; i < links.length; i++) {
              hash[links[i].sender].count = links[i].count;
              resultLinks.push({ source: hash[links[i].sender],
                target: hash[links[i].receiver]
              });
            }
            return resultLinks;
          }

          // 绘图。
          var line = d3.svg.line.radial()
            .interpolate("bundle")
            .tension(.75)
            .radius(function (d) { return d.y; })
            .angle(function (d) {  return d.x  / 180 * Math.PI; });
          that.params.email_ask_email_number = (that.params.email_ask_email_number || 0) + 1;
          var gBundle = that.svg.append("g")
            .attr("id","email_ask_email_"+that.params.email_ask_email_number)
            .attr("transform", "translate(" + (that.email_x) + "," + (that.email_y) + ")");
          gBundle.transition()
            .duration((that.params.lineHide || 200) + 6000)
            .remove();
          var color = d3.scale.category20c();
          var lineTime = that.params.lineTime || 5000;
          var animation = "draw "+ (lineTime + 2000 ) / 1000 +"s linear alternate";
          gBundle.selectAll("path[name=email_ask_email_new]")
            .attr("id",function(d){
              return d + "_old";
            });
          var link = gBundle.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("id", function (d) {
              return "email_ask_email_line_" + d[2].id;
            })
            .attr("id", function (d) {
              return "email_ask_email_line_" + d[2].id + "_" + d[0].id;
            })
            .attr("name","email_ask_email_new")
            .attr("data-name",function(d){
              return that.get_line_dataType(Enumerable.from(email_ask_email).where("$.sender=="+d[0].id).toArray()[0],"email_ask_email_line",play_type,this)
            })
            .style("animation", animation)
            .style("-webkit-animation", animation)
            .transition()
            .duration(lineTime)
            .attr("class", "link line_radius")
            .attr('stroke', function(d,i){
              if(Enumerable.from(email_ask_email).where("$.sender=="+d[0].id).toArray()[0].insecurityCount > 0 ){
                if(d[0].id > d[2].id)
                  return "url(#" + that.linearGradient_Radius_Rever.attr("id") + ")";
                else
                  return "url(#" + that.linearGradient_Radius.attr("id") + ")";
              }
              else{
                if(d[0].id > d[2].id)
                  return "url(#" + that.linearGradient_Radius_Rever_green.attr("id") + ")";
                else
                  return "url(#" + that.linearGradient_Radius_green.attr("id") + ")";
              }
            })
            .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
            .style("fill", "none")
            .style("stroke-linecap", "round")
            .attr("d", line)
            .transition()
            .duration(that.params.lineHide || 200)
            .style("opacity", function(d){
              if(Enumerable.from(email_ask_email).where("$.sender=="+d[0].id).toArray()[0].data_name === "email_ask_email_line_security")
                return 0;
              else
                return 1;
            });
          that.line_option("email_ask_email_line",gBundle);
          email_ask_email_line_security_clear();
          that.ask_intercept(email_ask_email,"email_ask_email",gBundle,animation);
        }

        // 邮箱攻击企业。
        if(email_ask_group.length > 0){
          method_email_group();
        }
        function method_email_group(){
          function email_ask_group_line_security_clear() {
            if(that.email_ask_group_line_security_timeout)
              clearTimeout(that.email_ask_group_line_security_timeout);

            that.email_ask_group_line_security_timeout = setTimeout(function () {
              that.svg.selectAll("path[data-name=email_ask_group_line_security]")
                .remove();
            },(that.params.lineTime || 3000) + 1000);
          }
          email_ask_group_line_security_clear();

          that.svg.selectAll("path[name=email_ask_group_new]")
            .attr("id",function(d){
              return d + "_old";
            });
          that.svg.selectAll()
            .data(email_ask_group)
            .enter()
            .append("path")
            .attr("id", function (d) {
              return "email_ask_group_line_" + d.receiver;
            })
            .attr("data-key", function (d) {
              return "email_ask_group_line_" + d.sender + "_" + d.receiver;
            })
            .attr("name","email_ask_group_new")
            .attr("data-name",function(d,i){
              return that.get_line_dataType(d,"email_ask_group_line",play_type,this)
            })
            .attr("d", function (d, i) {
              var star_point = Enumerable.from(that.emailList.children).where("$.id==" + d.sender).toArray()[0].point;
              var star_x = that.email_x + star_point.x;
              var star_y = that.email_y + star_point.y + that.params.style.email.paddingTop;
              var lineData = [{"x": parseInt(star_x), "y": parseInt(star_y)}, {
                "x": parseInt(star_x),
                "y": parseInt(star_y)
              }];
              return that.lineFunction(lineData)
            })
            .attr('stroke',function(d){
              if(d.insecurityCount > 0)
                return "url(#" + that.linearGradient_Rever.attr("id") + ")";
              else
                return "url(#" + that.linearGradient_Rever_green.attr("id") + ")";
            })
            .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
            .style("fill", "none")
            .style("stroke-linecap", "round")
            .transition()
            .duration(that.params.lineTime || 3000)
            .attr("d", function (d, i) {
              var star_point = Enumerable.from(that.emailList.children).where("$.id==" + d.sender).toArray()[0].point;
              var end_point = Enumerable.from(that.groupList.children).where("$.id==" + d.receiver).toArray()[0].point;
              var star_x = that.email_x + star_point.x ;
              var star_y = that.email_y + star_point.y + that.params.style.email.paddingTop;
              var end_x = that.group_x + end_point.x ;
              var end_y = that.group_y + end_point.y;
              var lineData = [{"x": parseInt(end_x), "y": parseInt(end_y)}, {
                "x": parseInt(star_x),
                "y": parseInt(star_y)
              }];
              return that.lineFunction(lineData)
            })
            .ease('linear')
            .transition()
            .duration(that.params.lineHide || 200)
            .style("opacity", function(d){
              if(d.data_name === "email_ask_group_line_security")
                return 0;
              else
                return 1;
            }).remove();
          that.line_option("email_ask_group_line");
          email_ask_group_line_security_clear();
          that.ask_intercept(email_ask_group,"email_ask_group");
        }

        // 企业攻击企业。
        if(group_ask_group.length > 0){
          method_group_ask_group();
        }
        function method_group_ask_group(){
          function group_ask_group_line_security_clear(){
            if(that.group_ask_group_line_security_timeout)
              clearTimeout(that.group_ask_group_line_security_timeout);

            that.group_ask_group_line_security_timeout = setTimeout(function () {
              that.svg.selectAll(".link[data-name=group_ask_group_line_security]")
                .remove();
            },(that.params.lineTime || 3000) + 1000);
          }
          group_ask_group_line_security_clear();

          var cluster = d3.layout.cluster()
            .size([-180, that.group_x - 160])
            .separation(function (a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
          var bundle = d3.layout.bundle();
          var nodes = cluster.nodes(that.groupList);
          var oLinks = map(nodes, group_ask_group);
          var links = bundle(oLinks);

          // 将links中的source和target由名称替换成节点。
          function map(nodes, links) {
            var hash = [];
            for (var i = 0; i < nodes.length; i++) {
              hash[nodes[i].id] = nodes[i];
            }
            var resultLinks = [];
            for (var i = 0; i < links.length; i++) {
              resultLinks.push({ source: hash[links[i].sender],
                target: hash[links[i].receiver]
              });
            }
            return resultLinks;
          }
          // 绘图。
          var line = d3.svg.line.radial()
            .interpolate("bundle")
            .tension(.85)
            .radius(function (d) { return d.y ; })
            .angle(function (d) { return d.x / 180 * Math.PI; });
          that.params.group_ask_group_number = (that.params.group_ask_group_number || 0) + 1;
          var gBundle = that.svg.append("g")
            .attr("id","group_ask_group_"+that.params.group_ask_group_number)
            .attr("transform", "translate(" + (that.group_x) + "," + (that.group_y) + ")");
          gBundle.transition()
            .duration((that.params.lineHide || 200) + 6000)
            .remove();
          var color = d3.scale.category20c();
          var lineTime = that.params.lineTime || 5000;
          var animation = "draw "+ (lineTime + 2000 ) / 1000 +"s linear alternate";
          gBundle.selectAll("path[name=group_ask_group_new]")
            .attr("id",function(d){
              return d + "_old";
            });
          var link = gBundle.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("id", function (d) {
              return "group_ask_group_line_" + d[2].id;
            })
            .attr("data-key",function(d){
              return "group_ask_group_line_" + d[0].id + "_" + d[2].id
            })
            .attr("data-name",function(d,i){
              return that.get_line_dataType(Enumerable.from(group_ask_group).where("$.sender=="+d[0].id).toArray()[0],"group_ask_group_line",play_type,this)
            })
            .attr("name","group_ask_group_new")
            .style("animation", animation)
            .style("-webkit-animation", animation)
            .transition()
            .duration(lineTime)
            .attr("class", "link line_radius")
            .attr('stroke',function(d){
              if(Enumerable.from(group_ask_group).where("$.sender=="+d[0].id).toArray()[0].insecurityCount > 0) {
                if (d[0].id > d[2].id)
                  return "url(#" + that.linearGradient_Radius_Rever.attr("id") + ")";
                else
                  return "url(#" + that.linearGradient_Radius.attr("id") + ")";
              }else{
                if (d[0].id > d[2].id)
                  return "url(#" + that.linearGradient_Radius_Rever_green.attr("id") + ")";
                else
                  return "url(#" + that.linearGradient_Radius_green.attr("id") + ")";
              }
            })
            .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
            .style("fill", "none")
            .style("stroke-linecap", "round")
            .attr("d", line)
            .transition()
            .duration(that.params.lineHide + 1000 || 200)
            .style("opacity", function(d){
              if(Enumerable.from(group_ask_group).where("$.sender=="+d[0].id).toArray()[0].data_name === "group_ask_group_line_security")
                return 0;
              else
                return 1;
            });
          var lanjie_data = Enumerable.from(group_ask_group).where("$.blocked").toArray();
            setTimeout(function(){
              for(var i=0;i<lanjie_data.length;i++){
                var item = lanjie_data[i];
                that.svg.selectAll("#group_ask_group_line_"+item.sender)
                  .transition()
                  .ease('linear')
                  .duration(500)
                  .style("opacity", 0)
                  .remove();
              }
            },500);
          (function(id){
            setTimeout(function () {
            },that.params.lineTime + 2000);
          })(that.params.group_ask_group_number);
          that.line_option("group_ask_group_line",gBundle);

          group_ask_group_line_security_clear();

          that.ask_intercept(group_ask_group,"group_ask_group",gBundle);
        }

        // 企业攻击邮箱。
        if(gorup_ask_email.length > 0){
          method_group_ask_email();
        }
        function method_group_ask_email() {
          function gorup_ask_email_line_security_clear(){
            if(that.gorup_ask_email_line_security_timeout)
              clearTimeout(that.gorup_ask_email_line_security_timeout);

            that.gorup_ask_email_line_security_timeout = setTimeout(function () {
              that.svg.selectAll("path[data-name=gorup_ask_email_line_security]")
                .remove();
            },(that.params.lineTime || 3000) + 1000);
          }
          gorup_ask_email_line_security_clear();

          that.svg.selectAll()
            .data(gorup_ask_email)
            .enter()
            .append("path")
            .attr("id", function (d) {
              return "group_ask_email_line_" + d.receiver;
            })
            .attr("data-key", function (d) {
              return "group_ask_email_line_" + d.sender + "_" + d.receiver;
            })
            .attr("data-name",function(d,i){
              return that.get_line_dataType(d,"gorup_ask_email_line",play_type,this)
            })
            .attr("d", function (d, i) {
              var star_point = Enumerable.from(that.groupList.children).where("$.id==" + d.sender).toArray()[0].point;
              var star_x = that.group_x + star_point.x;
              var star_y = that.group_y + star_point.y;
              if(d.send_name === "东北分部") {
                star_x -= 30;
              }
              var lineData = [{"x": parseInt(star_x), "y": parseInt(star_y)}, {
                "x": parseInt(star_x),
                "y": parseInt(star_y)
              }];
              return that.lineFunction(lineData)
            })
            .attr('stroke', function (d) {
              if (d.insecurityCount > 0)
                return "url(#" + that.linearGradient.attr("id") + ")";
              else
                return "url(#" + that.linearGradient_green.attr("id") + ")";
            })
            .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
            .style("fill", "none")
            .style("stroke-linecap", "round")
            .transition()
            .duration(that.params.lineTime || 3000)
            .attr("d", function (d, i) {
              var star_point = Enumerable.from(that.groupList.children).where("$.id==" + d.sender).toArray()[0].point;
              var end_point = Enumerable.from(that.emailList.children).where("$.id==" + d.receiver).toArray()[0].point;
              var star_x = that.group_x + star_point.x;
              var star_y = that.group_y + star_point.y;
              var end_x = that.email_x + end_point.x;
              var end_y = that.email_y + end_point.y + that.params.style.email.paddingTop;
              if(d.send_name === "东北分部"){
                star_x -= 30;
              }
              var lineData = [{"x": parseInt(end_x), "y": parseInt(end_y)}, {
                "x": parseInt(star_x),
                "y": parseInt(star_y)
              }];
              return that.lineFunction(lineData)
            })
            .ease('linear')
            .transition()
            .duration(that.params.lineHide || 200)
            .style("opacity", function(d){
              if(d.data_name === "gorup_ask_email_line_security")
                return 0;
              else
                return 1;
            }).remove();

          that.line_option("gorup_ask_email_line");
          gorup_ask_email_line_security_clear();
          that.ask_intercept(gorup_ask_email,"group_ask_email");
        }
      }
    }
  }

  get_line_dataType (d,name,play_type,askLine){
    console.log("name:",d.send_name,d.receiver_name,d.insecurityCount,play_type)
    askLine.setAttribute("data-askline",true);
    if(play_type === "realtime"){
      if (d.insecurityCount > 0 && (d.send_name ==="信通" || d.receiver_name==="信通"))
        d.data_name = name + "_danger";
      else
        d.data_name = name + "_security";
    }else
      d.data_name = name + "_security";
    return d.data_name;
  }
  /**
   * 攻击线的操作。
   * @param name
   */
  line_option(name,gBundle){
    var that = this;
    (gBundle || this.svg).selectAll("*[data-name="+name+"_danger]")
      .on("mouseover",function(d){
        d.old_storke = this.getAttribute("stroke");
        this.setAttribute("stroke","red");
        this.style.cursor = "pointer";
      })
      .on("mouseout",function (d) {
        this.setAttribute("stroke",d.old_storke);
        this.style.cursor = "default";
      })
      .on("click",function(d){
        if(gBundle){
          d[0].sender = d[0].id;
          d[0].receiver = d[2].id;
          that.Open_Win(event,d[0],name);
        }else{
          that.Open_Win(event,d,name);
        }
      });
  }
  /**
   * 攻击拦截动画。
   * @param dataList
   * @param type
   */
  ask_intercept(dataList,type,gBundle,animation){
    var that = this;
    var lanjie_data = Enumerable.from(dataList).where("$.blocked").toArray();
    switch (type){
      //企业攻击邮箱
      case "group_ask_email":
        setTimeout(function(){
          for(var i=0;i<lanjie_data.length;i++){
            var item = lanjie_data[i];
            var group_ask_email_line = that.svg.selectAll("#group_ask_email_line_"+item.receiver);
            group_ask_email_line = group_ask_email_line[group_ask_email_line.length-1][0];
            var d = group_ask_email_line.getAttribute("d");
            var point = d.substring(0,d.indexOf("L"));
            point = point.replace("M","")
            point = point.split(",");
            var dang_rect = that.svg.append("image")
              .attr("xlink:href","../../../static/img/svg/lanjie/dunpai.svg")
              .attr("x",point[0])
              .attr("y",point[1] - 15)
              .attr("width",30)
              .attr("height",30);
            group_ask_email_line.remove();
            that.svg.selectAll()
              .data([item])
              .enter()
              .append("path")
              .attr("id", function (d) {
                return "group_ask_email_line_" + d.receiver;
              })
              .attr("d", d)
              .attr('stroke', function (d) {
                if (d.insecurityCount > 0)
                  return "url(#" + that.linearGradient.attr("id") + ")";
                else
                  return "url(#" + that.linearGradient_green.attr("id") + ")";
              })
              .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
              .style("fill", "none")
              .style("stroke-linecap", "round")
              .transition()
              .duration(800)
              .attr("d", "M" + point[0]+","+point[1]+"L"+point[0]+","+point[1])
              .ease('linear')
              .style("opacity", 0)
              .remove();

            (function (dang_rect) {
              setTimeout(function(){
                dang_rect.remove();
              },800);
            })(dang_rect);
          }
        },that.params.lineHide / 2 + 100);
        break;

      // 邮箱攻击企业。
      case "email_ask_group":
        setTimeout(function(){
          for(var i=0;i<lanjie_data.length;i++){
            var item = lanjie_data[i];
            var group_ask_email_line = that.svg.selectAll("#email_ask_group_line_"+item.receiver);
            group_ask_email_line = group_ask_email_line[0][0];
            var d = group_ask_email_line.getAttribute("d");
            var point = d.substring(0,d.indexOf("L"));
            point = point.replace("M","")
            point = point.split(",");
            var dang_rect = that.svg.append("image")
              .attr("xlink:href","../../../static/img/svg/lanjie/dunpai.svg")
              .attr("x",point[0] - 30)
              .attr("y",point[1] - 20)
              .attr("width",30)
              .attr("height",30);
            that.svg.selectAll("#email_ask_group_line_"+item.receiver).remove();
            that.svg.selectAll()
              .data([item])
              .enter()
              .append("path")
              .attr("id", function (d) {
                return "email_ask_group_line_lanjie_" + d.receiver;
              })
              .attr("d", d)
              .attr('stroke', function (d) {
                if(d.insecurityCount > 0)
                  return "url(#" + that.linearGradient_Rever.attr("id") + ")";
                else
                  return "url(#" + that.linearGradient_Rever_green.attr("id") + ")";
              })
              .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
              .style("fill", "none")
              .style("stroke-linecap", "round")
              .transition()
              .duration(800)
              .attr("d", "M" + point[0]+","+point[1]+"L"+point[0]+","+point[1])
              .ease('linear')
              .style("opacity", 0)
              .remove();
            (function (dang_rect) {
              setTimeout(function(){
                dang_rect.remove();
              },800);
            })(dang_rect);
          }
        },200);
        break;

      // 企业攻击企业。
      case "group_ask_group":
        setTimeout(function(){
          for(var i=0;i<lanjie_data.length;i++){
            var item = lanjie_data[i];
            var group_ask_email_line = gBundle.selectAll("#group_ask_group_line_"+item.receiver);
            group_ask_email_line = group_ask_email_line[0][0];
            if(!group_ask_email_line) continue;
            var d = group_ask_email_line.getAttribute("d");
            var point = d.substring(d.indexOf("C") + 1);
            point = point.split(",");
            point[0] = parseFloat(point[0]);
            point[1] = parseFloat(point[1]);
            var stroke_color = group_ask_email_line.getAttribute("stroke");
            (function (point) {
              setTimeout(function(){
                gBundle.append("image")
                  .attr("xlink:href","../../../static/img/svg/lanjie/dunpai.svg")
                  .attr("x",point[0])
                  .attr("y",point[1])
                  .attr("width",30)
                  .attr("height",30)
                  .transition()
                  .duration(1800)
                  .style("opacity", 0)
                  .remove();
              },500);
            })(point);
            var animation = "draw 6s linear alternate";
            gBundle.selectAll("#group_ask_group_line_"+item.receiver).remove();
            gBundle.selectAll(".link")
              .data([item])
              .enter()
              .append("path")
              .attr("d", d)
              .style("animation", animation)
              .style("-webkit-animation", animation)
              .attr("class", "link line_radius")
              .attr('stroke',stroke_color)
              .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
              .style("fill", "none")
              .style("stroke-linecap", "round")
              .transition()
              .duration(1000)
              .ease('linear')
              .remove();
          }
        },900);
      break;

      // 邮箱攻击邮箱。
      case "email_ask_email":
        setTimeout(function(){
          for(var i=0;i<lanjie_data.length;i++){
            var item = lanjie_data[i];
            var group_ask_email_line = gBundle.selectAll("#email_ask_email_line_"+item.receiver);
            group_ask_email_line = group_ask_email_line[0][0];
            if(!group_ask_email_line) continue;
            var d = group_ask_email_line.getAttribute("d");
            var point = d.substring(d.lastIndexOf("C") + 1);
            point = point.split(",");
            point[0] = parseFloat(point[0]);
            point[1] = parseFloat(point[1]);
            var stroke_color = group_ask_email_line.getAttribute("stroke");
            (function (point) {
              setTimeout(function(){
                gBundle.append("image")
                  .attr("xlink:href","../../../static/img/svg/lanjie/dunpai.svg")
                  .attr("x",point[0])
                  .attr("y",point[1])
                  .attr("width",30)
                  .attr("height",30)
                  .transition()
                  .duration(2000)
                  .style("opacity", 0)
                  .remove();
              },500);
            })(point);
            gBundle.selectAll("#email_ask_email_line_"+item.receiver).remove();
            gBundle.selectAll(".link")
              .data([item])
              .enter()
              .append("path")
              .attr("d", d)
              .style("animation", animation)
              .style("-webkit-animation", animation)
              .attr("class", "link line_radius")
              .attr('stroke',stroke_color)
              .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
              .style("fill", "none")
              .style("stroke-linecap", "round")
              .transition()
              .duration(1200)
              .ease('linear')
              .remove();
          }
        },900);
        break;

      // 企业自己攻击自己。
      case "group_ask_me":
        setTimeout(function(){
          for(var i=0;i<lanjie_data.length;i++){
            var item = lanjie_data[i];
            var group_ask_email_line = that.svg.selectAll("#path_deg_group_"+item.sender);
            group_ask_email_line = group_ask_email_line[group_ask_email_line.length-1][0];
            var d = group_ask_email_line.getAttribute("d");
            var point = d.substring(0,d.indexOf("L"));
            point = point.replace("M","")
            point = point.split(",");
            var dang_rect = gBundle.append("image")
              .attr("xlink:href","../../../static/img/svg/lanjie/dunpai.svg")
              .attr("x",function(d){
                return d.img_point.x;
              })
              .attr("y",function(d){
                return d.img_point.y + 10;
              })
              .attr("width",30)
              .attr("height",30)
              .transition()
              .duration(800)
              .ease('linear')
              .style("opacity", 0)
              .remove();
            group_ask_email_line.remove();
            var email_g_path = gBundle.append("path");
            email_g_path.attr("transform",function (d) {
              return 'translate(' + (d.img_point.x ) + ',' + (d.img_point.y) + ')'
            })
              .attr("stroke",function (d) {
                var ask_item = Enumerable.from(lanjie_data).where("$.sender==" + d.id).toArray()[0];
                if (ask_item.insecurityCount > 0) {
                  return "url(#" + that.linearGradient_Radius_circular_Rever.attr("id") + ")";
                }
                else{
                  return "url(#" + that.linearGradient_Radius_circular_Rever_green.attr("id") + ")";
                }
              })
              .attr("name","group_ask_me_new")
              .attr("fill","transparent")
              .attr("fill-opacity",1)
              .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
              .attr("id","path_deg_group_lanjie_" + item.sender)
              .attr("d",function (d) {
                if(d.deg_inver)
                  clearInterval(d.deg_inver);
                var x = d.img_point.x;
                var y = d.img_point.y;
                var that_path = this;
                d.deg_inver = setInterval(function () {
                  if(d.path_deg >= 0.35){
                    clearInterval(d.deg_inver);
                    that.svg.select("#path_deg_group_lanjie_"+d.id).transition()
                      .duration(500)
                      .ease('linear')
                      .style("opacity", 0)
                      .remove();
                  }
                  d.path_deg += 0.005;
                  that_path.setAttribute("d",animation(x, y,d.path_deg));
                },10);
                return animation(x, y, d.path_deg);
              });
          }
        },that.params.lineHide / 2 + 100);
        break;

      // 邮箱自己攻击自己。
      case "email_ask_me":
        setTimeout(function(){
          for(var i=0;i<lanjie_data.length;i++){
            var item = lanjie_data[i];
            var group_ask_email_line = that.svg.selectAll("#path_deg_"+item.sender);
            group_ask_email_line = group_ask_email_line[group_ask_email_line.length-1][0];
            var d = group_ask_email_line.getAttribute("d");
            var point = d.substring(0,d.indexOf("L"));
            point = point.replace("M","")
            point = point.split(",");
            var dang_rect = gBundle.append("image")
              .attr("xlink:href","../../../static/img/svg/lanjie/dunpai.svg")
              .attr("x",function(d){
                return d.img_point.x - 70;
              })
              .attr("y",function(d){
                return d.img_point.y + 10;
              })
              .attr("width",30)
              .attr("height",30)
              .transition()
              .duration(1800)
              .ease('linear')
              .style("opacity", 0)
              .remove();
            group_ask_email_line.remove();
            var email_g_path = gBundle.append("path");
            email_g_path.attr("stroke",function (d) {
              var ask_item = Enumerable.from(lanjie_data).where("$.sender==" + d.id).toArray()[0];
              if (ask_item.insecurityCount > 0) {
                return "url(#" + that.linearGradient_Radius_circular.attr("id") + ")";
              }
              else{
                return "url(#" + that.linearGradient_Radius_circular_green.attr("id") + ")";
              }
            })
              .attr("fill","transparent")
              .attr("fill-opacity",1)
              .attr('stroke-width', that.params.style.ask.strokeWidth || 3)
              .attr("id","path_deg_lanjie_" + item.sender)
              .attr("d",function (d) {
                if(d.deg_inver)
                  clearInterval(d.deg_inver);
                var x = d.img_point.x;
                var y = d.img_point.y;
                var r = 30;
                var that_path = this;
                d.deg_inver = setInterval(function () {
                  if(d.path_deg > 200){
                    clearInterval(d.deg_inver);
                    that.svg.selectAll("#path_deg_lanjie_"+d.id).transition()
                      .duration(800)
                      .ease('linear')
                      .style("opacity", 0)
                      .remove();
                  }
                  d.path_deg += 1.5;
                  that_path.setAttribute("d",animation(x, y, r, d.path_deg, 0));
                },10);
                return animation(x, y, r, d.path_deg, 0);
              });
          }
        },that.params.lineHide / 2 + 100);
        break;
    }
  }

  /**
   * 修改攻击线条的样式。
   * @param a 线条前半段颜色渐变
   * @param b 线条后半段颜色渐变
   * @param params
   */
  change_askColor (a, b, params) {
    if (params) {
      for (var one in params) {
        this.params.style.ask[one] = params[one];
      }
    }
    // 定义线条渐变颜色。
    var a = d3.rgb(a[0], a[1], a[2]);
    var b = d3.rgb(b[0], b[1], b[2]);
    this.linearGradient.remove();
    this.linearGradient = this.defs.append("linearGradient")
      .attr("id", "linearColor")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    var stop1 = this.linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", a.toString());
    var stop2 = this.linearGradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", function(d){
        return b.toString()
      });
    this.linearGradient_Rever.remove();
    this.linearGradient_Rever = this.defs.append("linearGradient")
      .attr("id", "linearColor_rever")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    this.linearGradient_Rever.append("stop")
      .attr("offset", "0%")
      .style("stop-color", b.toString());
    this.linearGradient_Rever.append("stop")
      .attr("offset", "100%")
      .style("stop-color", a.toString());
    this.linearGradient_Radius.remove();
    this.linearGradient_Radius = this.defs.append("linearGradient")
      .attr("id", "linearColor_radius")
      .attr("x1", "100%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    this.linearGradient_Radius.append("stop")
      .attr("offset", "0%")
      .style("stop-color", b.toString());
    this.linearGradient_Radius.append("stop")
      .attr("offset", "100%")
      .style("stop-color", a.toString());
    this.linearGradient_Radius_Rever.remove();
    this.linearGradient_Radius_Rever = this.defs.append("linearGradient")
      .attr("id", "linearColor_radius_rever")
      .attr("x1", "100%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    this.linearGradient_Radius_Rever.append("stop")
      .attr("offset", "0%")
      .style("stop-color", a.toString());
    this.linearGradient_Radius_Rever.append("stop")
      .attr("offset", "100%")
      .style("stop-color", b.toString());
  }

  /**
   * 重置邮箱和企业数量。
   * @param dataList
   * @constructor
   */
  Reset_Number(askList){
    var that = this;
    askList = askList || [];
    that.email_arcs.selectAll("text#text_security")
      .text(function(d){
        if(d.name) {
          var item = Enumerable.from(askList).where("$.receiver==" + d.id).sum("$.count");
          if(!item) return "0";
          return item;
        }else
          return "";
      });
    that.email_arcs.selectAll("text#text_danger")
      .text(function(d){
        if(d.name) {
          var item = Enumerable.from(askList).where("$.receiver==" + d.id).sum("$.insecurityCount");
          if(!item) return "0";
          d.email_danger_count = item;
          return item;
        }else
          return "";
      })
      .attr("fill",function(d){
        if(d.email_danger_count > 0)
          return "#fa4b4a";
        else
          return "#8ee27d";
      });

    that.group_arcs.selectAll("text#text_security")
      .text(function(d){
        if(d.group) {
          var item = Enumerable.from(askList).where("$.receiver==" + d.id).sum("$.count");
          if(!item) return "0";
          d.text_security_count = parseInt(this.innerHTML) + item;
          return item;
        }else
          return "";
      })
      .attr("transform", function (d, i) {
        if(!d.group) return;
        var po = JSON.parse(JSON.stringify(d.point_text_security));
        if(d.text_security_count && d.text_security_count.toString().length>1){
          po[0] -= d.text_security_count.toString().length * 3;
          if(d.text_security_count.toString().length > 1){
            po[0] += 3;
          }
        }
        return "translate(" + po + ")";
      });
    that.group_arcs.selectAll("text#text_danger")
      .text(function(d){
        if(d.group) {
          var item = Enumerable.from(askList).where("$.receiver==" + d.id).sum("$.insecurityCount");
          if(!item) return "0";
          d.text_danger_count = parseInt(this.innerHTML) + item;
          return item;
        }else
          return "";
      })
      .attr("transform", function (d, i) {
        if(!d.group) return;
        var po = JSON.parse(JSON.stringify(d.point_text_danger));
        if((d.text_security_count && d.text_security_count.toString().length>1)){
          po[0] -= d.text_security_count.toString().length * 5;
        }
        if(d.text_danger_count && d.text_danger_count.toString().length>1){
          po[0] -= d.text_danger_count.toString().length * 4;
        }
        return "translate(" + po + ")";
      })
      .attr("fill",function(d){
        if(d.text_danger_count > 0)
          return "#fa4b4a";
        else
          return "#8ee27d";
      });

    that.group_arcs.selectAll("text#text_line")
      .attr("transform",function (d) {
        if(!d.group || !d.point_line) return;
        var po_line = JSON.parse(JSON.stringify(d.point_line));
        if(d.text_security_count && d.text_security_count.toString().length>1)
          po_line[0] -= d.text_security_count.toString().length * 5;
        return "translate(" + po_line + ")";
      });
  }

  /**
   * 删除攻击线。
   * @param senderId
   * @param receiverId
   * @param type
   */
  remove_askline(senderId,receiverId,type){
    var line;
    switch (type){
      case 0:
        line = this.svg.selectAll("*[data-key=group_ask_email_line_" +senderId + "_" + receiverId+"]");
        break;
      case 1:
        line = this.svg.selectAll("*[data-key=group_ask_group_line_" +senderId + "_" + receiverId+"]");
        break;
      case 2:
        line = this.svg.selectAll("*[data-key=email_ask_group_line_" +senderId + "_" + receiverId+"]")
        break;
      case 3:
        line = this.svg.selectAll("*[data-key=email_ask_email_line_" +senderId + "_" + receiverId+"]")
        break;
      case 4:
        if(senderId >= 200)
          line = this.svg.selectAll("#path_deg_" + senderId);
        else
          line = this.svg.selectAll("#path_deg_group_" + senderId);
        break;
    }
    if(line){
      line.transition()
        .duration(100)
        .style("opacity",0)
        .remove();
    }
  }

  /**
   * 删除所有攻击线
   */
  remove_askline_all(){
    this.svg.selectAll("*[data-askline=true]").remove();
  }
}

export default group_ask_email;
