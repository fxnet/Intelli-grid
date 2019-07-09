/**
 * 邮件监测数据汇总统计。
 * @param svg
 * @param params
 */

import d3 from "../../../static/js/common/d3.min";
import Enumerable from "linq";

class pieChart {
  constructor(svg, params) {
    this.params = params || {};
    var params = {
      width: 350,
      height: 400,
      clearance: 0.05,
      effectTime:1000
    };
    for (var one in params) {
      if (!this.params[one])
        this.params[one] = params[one];
    }
    svg = svg.attr("width", this.params.width)
      .attr("height", this.params.height);
    this.svg = svg;
  }

  tweenArc(b) {
    var that = this;
    return function(a, i) {
      var d = b.call(this, a, i),
        i = d3.interpolate(a, d);
      return function(t) {
        return that.arc(i(t));
      };
    };
  }

  /**
   * 饼图初始化。
   * @param dataList
   */
  init(dataList){
    var that = this;
    var pie = d3.layout.pie().sort(null)
      .value(function(d){
        return d.count;
      });
    this.pie = pie;
    var dataset = dataList;
    var outerRadius = this.params.width / 4;
    var innerRadius = this.params.width / 8;
    var width = this.params.width;
    var height = this.params.height;
    var svg = this.svg;

    var arc = d3.svg.arc() //弧生成器
      .innerRadius(innerRadius) //设置内半径
      .outerRadius(outerRadius); //设置外半径

    var color = d3.scale.category10();//构造20种颜色的序数比例尺，索引值可以是字符串或数字
    var pie = d3.layout.pie()   //饼图布局
      .sort(null)             //不排序，不写则会从大到小，顺时针排序。
      .value(function(d){ return d.count;});     //设置value值为上面的2二维数组中的数字
    var piedata=pie(dataset);

    var arcs=svg.selectAll(".arc")
      .data(piedata) //返回是pie(data0)
      .enter().append("g")
      .attr("class", "arc")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")   //将圆心平移到svg的中心
      .append("path")
      .attr("fill", function(d, i) {
        return color(i);            //根据下标填充颜色
      })
      .attr("d", function(d, i) {
        if(d.endAngle){
          d.endAngle -= that.params.clearance;
        }else{
          d.endAngle = 0;
        }
        if(!d.startAngle){
          d.startAngle = 0;
        }
        return arc(d);              ///调用上面的弧生成器
      });

    var text=svg.selectAll(".text")
      .data(piedata) //返回是pie(data0)
      .enter().append("g")
      .attr("class", "text")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .append("text")
      .style('text-anchor', function(d, i) {
        //根据文字在是左边还是右边，在右边文字是start，文字默认都是start。
        return (d.startAngle + d.endAngle)/2 < Math.PI ? 'start' : 'end';
      })
      .attr('transform', function(d, i) {
        var pos = arc.centroid(d);      //centroid(d)计算弧中心
        pos[0]=outerRadius*((d.startAngle+d.endAngle)/2<Math.PI?1.4:-1.4)
        pos[1]*=2.1;                    //将文字移动到外面去。
        return 'translate(' + pos + ')';
      })
      .attr("dy",".3em")              //将文字向下便宜.3em
      .style("font-size","12px")
      .attr("fill","white")
      .text(function(d) {             //设置文本
        console.log(d)
        return d.data.departmentName;
      })

    var text2=svg.selectAll(".text2")
      .data(piedata) //返回是pie(data0)
      .enter().append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .append("text")
      .style('text-anchor',"middle")
      .attr('transform', function(d, i) {
        var pos = arc.centroid(d);          //将数字放在圆弧中心
        return 'translate(' + pos + ')';
      })
      .attr("id","value")
      .attr("fill","white")
      .style("font-size","12px")
      .text(function(d) {
        return d.value;
      })
    var line = svg.selectAll(".line")      //添加文字和弧之间的连线
      .data(piedata) //返回是pie(data0)
      .enter().append("g")
      .attr("class", "line")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .append("polyline")
      .attr('points', function(d, i) {
        var pos1= arc.centroid(d),pos2= arc.centroid(d),pos3= arc.centroid(d);
        pos1[0]*=2,pos1[1]*=2;
        pos2[0]*=2.1,pos2[1]*=2.1
        pos3[0]=outerRadius*((d.startAngle+d.endAngle)/2<Math.PI?1.4:-1.4)
        pos3[1]*=2.1;
        //pos1表示圆弧的中心边缘位置，pos2是网上稍微去了一下，pos3就是将pos2平移后得到的位置
        //三点链接在一起就成了线段。
        return [pos1,pos2,pos3];
      })
      .style('fill', 'none')
      .style('stroke',function(d,i){
        return color(i);
      })
      .style('stroke-width', "1px")
      .style('stroke-dasharray',"0px")
  }

  /**
   * 修改饼图数据。
   * @param dataList
   */
  change(dataList){
    //this.init(dataList);
  }
}
export default pieChart;
