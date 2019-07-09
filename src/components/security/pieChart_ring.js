/**
 * 邮件监测数据汇总统计。
 * @param svg
 * @param params
 */

import d3 from "../../../static/js/common/d3.min";
import Enumerable from "linq";

class pieChart_ring {
  constructor(svg, params) {
    this.params = params || {};
    var params = {
      width: 350,
      height: 400,
    };
    for (var one in params) {
      if (!this.params[one])
        this.params[one] = params[one];
    }
    this.radius = Math.min(this.params.width, this.params.height) / 2;
    svg = svg.attr("width", this.params.width)
      .attr("height", this.params.height)
      .append("g")
      .attr("transform", "translate(" + this.radius + "," + this.radius + ")");
    this.svg = svg;
  }

  /**
   * 饼图初始化。
   * @param dataList
   */
  init(dataList){
    var that = this;
    var color = d3.scale.category20();
    var partition = d3.layout.partition()
      .sort(null)
      .size([2 * Math.PI, this.radius * this.radius])
      .value(function(d) { return 1; });
    var arc = d3.svg.arc()
      .startAngle(function(d) { return d.x; })
      .endAngle(function(d) {
        return d.x + d.dx;
      })
      .innerRadius(function(d) {
        return Math.sqrt(d.y) - 30;
      })
      .outerRadius(function(d) {
        return Math.sqrt(d.y + d.dy);
      });
      var nodes = partition.nodes(dataList);
      var links = partition.links(nodes);
      var arcs = that.svg.selectAll("g")
        .data(nodes)
        .enter().append("g");
      arcs.append("path")
        .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
        .attr("d", arc)
        .style("stroke", "#1e1e1e")
        .style("stroke-width", function(d){
          if(d.parent)
            return 0;
          else
            return 1;
        })
        .style("fill", function(d) {console.log(d); return color((d.children ? d : d.parent).name); })
  }

  /**
   * 修改饼图数据。
   * @param dataList
   */
  change(dataList){
    this.init(dataList);
    return;
    var dataset = Enumerable.from(dataList).select("$.number").toArray();
    var piedata = this.pie(dataset);
    var sum=0;
    piedata.forEach(function(d,i){
      d._endAngle=d.endAngle;
      d.endAngle=d.startAngle;
      d.duration=2000*(d.data/d3.sum(dataset));// 动画时长2秒，计算每一个弧形所用动画时间。
      d.delaytime=sum;
      sum+=d.duration;
    });
    var arc = this.arc;
    this.svg.selectAll("g path")
      .data(piedata)
      .attr("d",function(d){
        d.endAngle -= 0.05;
        return arc(d);
      })
      .transition()
      .duration(function(d,i){
        return d.duration;
      })
      .ease("linear")
      .delay(function(d,i){
        return d.delaytime;
      })
      .attrTween("d", this.tweenArc(function(d, i) {
        return {
          startAngle: d.startAngle,
          endAngle: d._endAngle
        };
      }))
  }
}
export default pieChart_ring;
