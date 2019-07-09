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
    var outerRadius = this.params.width / 2;
    var innerRadius = this.params.width / 6;
    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    this.arc = arc;
    var color = d3.scale.category10();
    var dataset = Enumerable.from(dataList).toArray();
    var piedata = pie(dataset);
    var sum=0;
    this.svg.selectAll("g").remove("");
    if(Enumerable.from(dataList).sum("$.count") === 0)
      return;
    var arcs = this.svg.selectAll("g")
      .data(piedata)
      .enter()
      .append("g")
      .attr("transform","translate("+outerRadius+","+outerRadius+")");
    arcs.append("path")
      .attr("fill",function(d,i){
        return color(i);
      })
      .attr("d",function(d){
        if(d.endAngle){
          d.endAngle -= that.params.clearance;
        }else{
          d.endAngle = 0;
        }
        if(!d.startAngle){
          d.startAngle = 0;
        }
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
      }));
    var txt_g = arcs.append("g");
    txt_g.append("text")
      .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor","middle")
      .style("font-size","12px")
      .attr("fill","white")
      .text(function(d){
        return d.data.departmentName;
      });
    txt_g.append("text")
      .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("id","value")
      .attr("text-anchor","middle")
      .attr("fill","white")
      .style("font-size","12px")
      .attr("y",20)
      .text(function(d){
        return d.value;
      });
  }

  /**
   * 修改饼图数据。
   * @param dataList
   */
  change(dataList){
    this.init(dataList);
  }
}
export default pieChart;
