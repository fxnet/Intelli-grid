<style lang="less">
  @import "../assets/less/default";
</style>
<template>
  <div class="main" @mousemove="window_mouse('move',$event)">
    <div class="header_title">
      <div class="top">
        <ul>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
        </ul>
        <label class="h2">国网敏感数据检测平台</label>
        <ul>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
          <li>&nbsp;</li>
        </ul>
      </div>
      <label class="datetime">&nbsp;</label>
    </div>
    <div class="menu1">
      <div class="header">
        <div class="data" style="margin-top: -5px;">
          <label>24小时汇总数据</label>
          <ul id="percentage" style="margin-top: 5px">
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li class="red">&nbsp;</li>
            <li class="red">&nbsp;</li>
            <li class="red">&nbsp;</li>
            <li class="red">&nbsp;</li>
            <li class="red">&nbsp;</li>
          </ul>
        </div>
      </div>
      <div class="group_ask_email">
        <div class="tip">
          <ul>
            <li v-bind:class="{active:gm}">
              <label>涉密</label>
              <span v-show="pendingFileList[1].sumCount>0">
                <ul class="dian">
                  <li v-for="one in pendingFileList[1].count" @click="Open_WinInfo($event,'gm','li',1)">&nbsp;</li>
                </ul>
                <button @click="Open_WinInfo($event,'gm',undefined,1)"><b
                  v-show="pendingFileList[1].sumCount>4">+</b>{{pendingFileList[1].sumCount}}</button>
                <i style="position: fixed"></i>
              </span>
            </li>
            <li v-bind:class="{active:gh}">
              <label>规划</label>
              <span v-show="pendingFileList[2].sumCount>0">
                <ul class="dian">
                  <li v-for="one in pendingFileList[2].count" @click="Open_WinInfo($event,'gh','li',2)">&nbsp;</li>
                </ul>
                <button @click="Open_WinInfo($event,'gh',undefined,2)"><b
                  v-show="pendingFileList[2].sumCount>4">+</b>{{pendingFileList[2].sumCount}}</button>
                <i style="position: fixed"></i>
              </span>
            </li>
            <li v-bind:class="{active:fa}">
              <label>方案</label>
              <span v-show="pendingFileList[3].sumCount>0">
                <ul class="dian">
                  <li v-for="one in pendingFileList[3].count" @click="Open_WinInfo($event,'fa','li',3)">&nbsp;</li>
                </ul>
                <button @click="Open_WinInfo($event,'fa',undefined,3)"><b
                  v-show="pendingFileList[3].sumCount>4">+</b>{{pendingFileList[3].sumCount}}</button>
                <i style="position: fixed"></i>
              </span>
            </li>
            <li v-bind:class="{active:jy}">
              <label>纪要</label>
              <span v-show="pendingFileList[4].sumCount>0">
                <ul class="dian">
                  <li v-for="one in pendingFileList[4].count" @click="Open_WinInfo($event,'jy','li',4)">&nbsp;</li>
                </ul>
                <button @click="Open_WinInfo($event,'jy',undefined,4)"><b
                  v-show="pendingFileList[4].sumCount>4">+</b>{{pendingFileList[4].sumCount}}</button>
                <i style="position: fixed"></i>
              </span>
            </li>

            <li v-bind:class="{active:qita}">
              <label>其他</label>
              <span v-show="pendingFileList[5].sumCount>0">
                <ul class="dian">
                  <li v-for="one in pendingFileList[5].count" @click="Open_WinInfo($event,'jy','li',5)">&nbsp;</li>
                </ul>
                <button @click="Open_WinInfo($event,'qita',undefined,5)"><b v-show="pendingFileList[5].sumCount>5">+</b>{{pendingFileList[5].sumCount}}</button>
                <i style="position: fixed"></i>
              </span>
            </li>
          </ul>
        </div>
        <svg id="group_ask_email" style="margin-left: -156px;width: calc(100% - 20px);"></svg>
        <div class="tongji">
          <label>公司外网收取统计</label>
          <i class="hor_line"></i>
          <ul>
            <li>
              <label>敏感</label>
              <label id="receiveInsecurityCount">0</label>
            </li>
            <li>
              <label>正常</label>
              <label id="receiveCount">0</label>
            </li>
          </ul>
        </div>
        <div class="tongji right">
          <label>社会互联网收取统计</label>
          <i class="hor_line"></i>
          <ul>
            <li>
              <label>敏感</label>
              <label id="receiveInsecurityCount2">{{outReceiveInsecurityCount}}</label>
            </li>
            <li>
              <label>正常</label>
              <label id="receiveCount2">{{outReceiveCount}}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="menu2">
      <div class="header">
        <!--<div class="line">&nbsp;</div>
        <ul class="title">
          <li>
            <label class="name">总统计数</label>
            <br>
            <label class="tjsz" id="totalCount">212,568</label>
          </li>
          <li>
            <label class="name">敏感</label>
            <br>
            <label class="mg" id="totalInsecurityCount">1,012</label>
          </li>
        </ul>-->
        <div class="data">
          <div class="right_button">
            <label v-show="BoFangType==='hf'&&huifangTime_Temp">{{huifangTime_Temp}}</label>
            <span>
              <button @click="BoFang('js')" v-bind:class="{selected:BoFangType==='js'}">实时模式</button>
              <button @click="BoFang('hf')" v-bind:class="{selected:BoFangType==='hf'}">回放模式</button>
            </span>
          </div>
          <ul class="data_list">
            <li v-for="one in eventList" v-bind:class="{static_zc:one.type===0}">
              <embed class="icon" v-show="one.type===1"
                     v-bind:src="'../../static/img/svg/status/iconfont_'+one.img+'_danger.svg'"></embed>
              <embed class="icon" v-show="one.type===0"
                     v-bind:src="'../../static/img/svg/status/iconfont_'+one.img+'_green.svg'"></embed>
              <div class="left_title">
                <label class="layer">{{one.eventName}}</label>
                <label class="layer_small">{{one.type === 1 ? '敏感事件' : '正常'}}</label>
              </div>
              <div class="right_content">
                <p>
                  <label class="jtsyb">{{one.departmentName}}</label>
                  <label class="ip">{{one.ip}}</label>
                </p>
                <p>
                  <label class="datetime">{{one.datetime}}</label>
                  <label class="filename">{{one.fileName}}</label>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="person_monitoring">
        <div class="person_monitoring_title">
          <label>公司部门数据监测及汇总展示</label>
          <ul>
            <li v-bind:class="{active:man_active===1}" @click="cast_man(1)">调控中心</li>
            <li v-bind:class="{active:man_active===2}" @click="cast_man(2)">运检中心</li>
            <li v-bind:class="{active:man_active===3}" @click="cast_man(3)">工程中心</li>
            <li v-bind:class="{active:man_active===4}" @click="cast_man(4)" style="width: 250px;">技保中心及各职能部门</li>
          </ul>
        </div>
        <svg id="person_monitoring"></svg>
      </div>
      <div class="bottom">
        <div class="bottom_left">
          <div class="pieChart">
            <div class="chart_header">
              <label>涉密成员监测数据统计</label>
              <i class="hor_line"></i>
            </div>
            <div class="chart_body">
              <svg id="pieChart_ring" style="float:none;"></svg>
            </div>
          </div>
          <div class="email_sort">
            <div class="chart_header">
              <label>部门监测数据排名</label>
              <i class="hor_line"></i>
            </div>
            <div class="chart_body">
              <svg id="depart_sort" style="margin-right: 10px;"></svg>
            </div>
          </div>
        </div>
        <div class="open_win bottom_right" style="position: static;">
          <ul>
            <li>
              <label>邮件发送方</label>
              <label>邮件接收方</label>
              <label>正常数量</label>
              <label>敏感数量</label>
            </li>
          </ul>
          <ul id="attack_list_ul">
            <li class="content" v-for="item in group_ask_list">
              <label>{{item.send_name}}</label>
              <label>{{item.receiver_name}}</label>
              <label>{{item.count}}</label>
              <label>{{item.insecurityCount}}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="open_win left_open_win" v-show="open_win"
         v-bind:style="{left:(open_win_point.x?+open_win_point.x+'px':''),top:open_win_point.y+'px'}"
         @click="NoBulle($event)">
      <ul>
        <li>
          <label>操作</label>
          <label>公司</label>
          <label>时间</label>
          <label>发件人</label>
          <label>收件人</label>
          <label>主题</label>
        </li>
      </ul>
      <ul>
        <li style="display: none;"></li>
        <li class="content" v-for="one in PendingEmails_Arr">
          <label>
            <i @click="change_emailStatus(one.id,1)"></i>
            <embed src="../../static/img/svg/iconfont_safe.svg"></embed>
            <i @click="change_emailStatus(one.id,2)"></i>
            <embed src="../../static/img/svg/iconfont_police.svg"></embed>
          </label>
          <label v-bind:title="one.companyName">{{one.companyName || "&nbsp;"}}</label>
          <label v-bind:title="one.time">{{one.time || "&nbsp;"}}</label>
          <label v-bind:title="one.sender">{{one.sender || "&nbsp;"}}</label>
          <label v-bind:title="one.receiver">{{one.receiver || "&nbsp;"}}</label>
          <label v-bind:title="one.subject">{{one.subject || "&nbsp;"}}</label>
        </li>
      </ul>
    </div>

    <div class="window" v-show="HuiFangShow" v-bind:style="{left:win_x+'px',top:win_y+'px'}">
      <div class="header" @mousedown="window_mouse('down',$event)" @mouseup="window_mouse('up')">
        <label>回放模式</label>
        <button @click="HuiFangShow=false;"><img src="../../static/img/close.png"></button>
      </div>
      <div class="content">
        <ul>
          <li>
            <label>起始时间：</label>
            <input type="text" v-model="huifangTime" @change="huiFang_Change()" @focus="time_blur($event)"
                   @blur="time_blur($event)" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})"/>
          </li>
          <li>
            <label>步长：</label>
            <input type="number" v-model="step" @change="huiFang_Change()"/>
            <label>（单位：分钟）</label>
          </li>
        </ul>
      </div>
      <div class="footer">
        <button @click="Start_HuiFang()" v-bind:disabled="!huifangTime">{{huiFangText}}</button>
        <button @click="HuiFangShow=false;">取消</button>
      </div>
    </div>

    <!--右侧小人操作弹出面板-->
    <div id="man_windows" class="open_win" v-show="open_man.is_open_man"
         v-bind:style="{top:open_man.y+'px',left:open_man.x+'px'}" @click="NoBulle($event)">
      <ul>
        <li>
          <label v-bind:style="{width:open_man.columns.length > 3 ? '20%' : '25%'}">操作</label>
          <label v-for="one in open_man.columns" v-bind:style="{width:one.width}">{{one.name}}</label>
        </li>
      </ul>
      <ul>
        <li style="display: none;"></li>
        <li class="content" v-for="one in open_man.rows">
          <label v-bind:style="{width:open_man.columns.length > 3 ? '20%' : '25%'}">
            <i @click="processEmail(1,one.id)"></i>
            <embed src="../../static/img/svg/iconfont_safe.svg"></embed>
            <i @click="processEmail(2,one.id)"></i>
            <embed src="../../static/img/svg/iconfont_police.svg"></embed>
          </label>
          <label v-for="colu in open_man.columns" v-bind:title="one[colu.key]"
                 v-bind:style="{width:colu.width}">{{one[colu.key] || "&nbsp;"}}</label>
        </li>
      </ul>
    </div>

    <!--攻击线点击弹出面板-->
    <div class="open_win left_open_win" v-show="open_ask_line.is_open"
         v-bind:style="{left:open_ask_line.x+'px',top:open_ask_line.y+'px'}" @click="NoBulle($event)">
      <ul>
        <li>
          <label>操作</label>
          <label>公司</label>
          <label>时间</label>
          <label>发件人</label>
          <label>收件人</label>
          <label>主题</label>
        </li>
      </ul>
      <ul>
        <li style="display: none;"></li>
        <li class="content" v-for="one in PendingEmails_Arr">
          <label>
            <i @click="change_emailStatus(one.id,1,$event)"></i>
            <embed src="../../static/img/svg/iconfont_safe.svg"></embed>
            <i @click="change_emailStatus(one.id,2,$event)"></i>
            <embed src="../../static/img/svg/iconfont_police.svg"></embed>
          </label>
          <label v-bind:title="one.companyName">{{one.companyName || "&nbsp;"}}</label>
          <label v-bind:title="one.time">{{one.time || "&nbsp;"}}</label>
          <label v-bind:title="one.sender">{{one.sender || "&nbsp;"}}</label>
          <label v-bind:title="one.receiver">{{one.receiver || "&nbsp;"}}</label>
          <label v-bind:title="one.subject">{{one.subject || "&nbsp;"}}</label>
        </li>
      </ul>
    </div>

    <!--confirm-->
    <div class="window" v-show="confirm.show" v-bind:style="{left:win_x+'px',top:win_y+'px'}">
      <div class="header" @mousedown="window_mouse('down',$event)" @mouseup="window_mouse('up')">
        <label>确认选择</label>
        <button @click="confirm.show=false;"><img src="../../static/img/close.png"></button>
      </div>
      <div class="content">
        <label>确定要刷新数据列表吗？</label>
      </div>
      <div class="footer">
        <button @click="NoBulle($event);getPendingEmails(getPendingEmails_type);confirm.show=false;">确定</button>
        <button @click="confirm.show=false;">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
  import d3 from "../../static/js/common/d3.min";

  import config from '../../static/config';
  import Enumerable from "linq";
  import group_ask_email from "./security/group_ask_email";
  import emailSort from "./security/emailSort";
  import stacked from "./security/stacked_Column";
  import pieChart from "./security/pieChart";
  import person_monitoring from "./security/person_monitoring";
  import pieChart_ring from "./security/pieChart_ring";

  export default {
    name: 'default',
    data() {
      return {
        confirm: {show: false, x: 300, y: 200},
        getHistoryEmployeeStatusList_HTTP: {},
        employeeStatusList: [],
        man_active: 1,
        play_type: "js",
        open_ask_line: {is_open: false},
        open_man: {is_open_man: false, columns: [], rows: [], employeeId: 0},
        firstTimeDate: "",
        PendingEmails_Arr: [],
        pendingFileList: {1:0, 2: 0, 3: 0, 4: 0, 5: 0},
        win_x: document.body.offsetWidth - 540,
        win_y: 60,
        HuiFangShow: false,
        huiFangText: "开始回放",
        step: 1,
        huifangTime_Temp: "",
        huifangTime: "",
        BoFangType: "js",
        server_url: "http://battleheart.natapp1.cc", // 测试地址。
        // server_url: "http://10.3.20.187:8075", // 国网地址。
        outReceiveInsecurityCount: 0,
        outReceiveCount: 0,
        gh: false,
        fa: false,
        gm: false,
        jy: false,
        qita: false,
        open_win_point: {},
        open_win: false,
        eventList: [],
        group_ask_list: [],
        group_email_ask_list: [
          {
            "sender": 101,
            "receiver": 105,
            "type": 1
          },

        ]
      }
    },
    mounted() {
      var that = this;
      window.onclick = function () {
        that.open_man.is_open_man = false;
      }
      this.win_x = document.body.offsetWidth - 530;
      return that.init();
      document.body.style.display = "none";
      var url = "http://10.3.20.187:8084/";
      d3.json(url + 'get_token', function (error, data) {
        if (data) {
          document.body.style.display = "block";
          d3.json(url + 'remove_token', function (error, data) {
            that.init();
          });
        } else {
          location.href = url;
        }
      });

      /**
       * 窗口改变事件处理函数。
       */
      window.onresize = function () {
        window.location.reload();
      }

    },
    methods: {
      window_mouse(type, ev) {
        switch (type) {
          case "down":
            this.win_down = true;
            this.win_old_x = this.win_x;
            this.win_old_y = this.win_y;
            this.win_down_x = ev.x;
            this.win_down_y = ev.y;
            break;
          case "move":
            if (this.win_down) {
              this.win_x = this.win_old_x + (ev.x - this.win_down_x);
              this.win_y = this.win_old_y + (ev.y - this.win_down_y);
            }
            break;
          case "up":
            this.win_down = false;
            break;
        }
      },

      // 时间离开。
      time_blur(ev) {
        if (ev.target.value)
          this.huifangTime = ev.target.value;
      },

      // 回放时间、步长修改。
      huiFang_Change() {
        this.huiFangText = "开始回放";
      },

      // 开始回放。
      Start_HuiFang() {
        return;
        clearTimeout(this.BoFang_Timeout);
        this.getRealTime_HTTP.abort();
        this.initTime = this.huifangTime;
        this.huifangTime_Temp = this.huifangTime;
        this.firstTimeDate = this.huifangTime;
        this.huifangTime_first_time = new Date(this.initTime).Format("yyyy-MM-dd hh:mm:ss");
        var that = this;
        this.group_ask.remove_askline_all();
        this.get_nowAskCount(this.initTime, function (data) {
          that.group_ask.Reset_Number(data);
          that.get_history_man(function () {
          });
          that.getask(that.step);
        });
        this.HuiFangShow = false;
      },

      // 切换播放类型。
      BoFang(type) {
        this.BoFangType = type;
        var that = this;
        that.play_type = type;
        if (type === "js") {
          this.HuiFangShow = false;
          this.huiFangText = '开始回放';
          this.huifangTime = "";
          this.huifangTime_Temp = "";
          this.initTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
          /*clearTimeout(this.BoFang_Timeout);
          this.getRealTime_HTTP.abort();
          this.get_nowAskCount(this.initTime, function (data) {
            that.group_ask.Reset_Number(data);
            that.get_history_man(function () {
            });
            that.getask();
          });*/
        } else {
          this.HuiFangShow = true;
          this.win_x = document.body.offsetWidth - 530;
          this.win_y = 60;
        }
      },

      // 打开窗口面板。
      Open_WinInfo(dom, type, domType, dataType, receiver) {
        if (dataType === "ask_line") {
          this.open_win_point.y = dom.y;
          this.open_win_point.x = dom.x;
          this.getPendingEmails(type, "ask_line", receiver);
        } else {
          this.gm = false;
          this.jy = false;
          this.fa = false;
          this.gh = false;
          this.qita = false;
          this[type] = true;
          var a = dom.target;
          while (a.tagName != "SPAN") {
            a = a.parentNode;
          }
          var y = a.querySelector("i").offsetTop;
          this.open_win_point.y = y + 34;
          this.open_win_point.x = undefined;
          //初始化国秘、规划、方案
          this.getPendingEmails(dataType);
        }
        this.open_win = true;
        this.NoBulle(dom);

      },
      /**
       * 页面初始化。
       */
      init() {
        var that = this;
        document.body.onclick = function () {
          that.gm = false;
          that.jy = false;
          that.fa = false;
          that.gh = false;
          that.qita = false;
          that.open_win = false;
          that.open_ask_line.is_open = false;
        }

        // 时间格式化。
        Date.prototype.Format = function (fmt) {
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        };

        // 初始化企业攻击邮箱。
        this.getBase();
      },

      /**
       * 初始化圆环图。
       * */
      init_pieChart_ring() {
        var svg = d3.select("svg#pieChart_ring");
        var pie_ring = new pieChart(svg, {
          width: 200,
          height: 200,
        });
        this.pie_ring = pie_ring;

      },

      /**
       * 初始化部门监测数据排名。
       * */
      init_depart_sort() {
        var that = this;
        var svg = d3.select("svg#depart_sort2");
        var svg = d3.select("svg#depart_sort");
        var params = {
          width: 210,
          height: 220,
          rectPadding: 10,
          rect_radius: 3,
          effectTime: 1000,
          type: "font",
          rectColor: "#d49d6b"
        };
        var email_sort2 = new stacked(svg, params);
        this.email_sort_right2 = email_sort2;


      },

      /**
       * 初始化人员监控。
       * */
      init_person_monitoring(askList) {
        var that = this;
        var svg = d3.select("svg#person_monitoring");
        setTimeout(function () {
          var person = new person_monitoring(svg, {
            width: document.querySelector(".person_monitoring").offsetWidth - 2,
            height: document.querySelector(".person_monitoring").offsetHeight - 80,
            g_width: 90,
            g_height: 100,
            padding: {left: 0, top: 0},
            handle_data: function (item) { // 处理小人数据。
              that.get_json(that.server_url + "/monitor/processAll?employeeId=" + item.employeeId + "&action=1", function (data) {
                if (data.resultCode != 0) {
                  alert(data.resultMessage);
                } else {
                  data = data.data;
                  if (data)
                    that.person.change_status([data]);
                }
              });
            }
          });
          that.person = person;

          var dataList = Enumerable.from(that.employeeGroupList).where("$.category==" + that.man_active).toArray()[0];
          if (dataList)
            dataList = dataList.employeeList;
          dataList = dataList || [];
          dataList = Enumerable.from(dataList).select("{employeeId:$.id,id:$.id,name:$.name,employeeIps:$.employeeIps,categroy:$.categroy,email:$.email}").toArray();
          person.init(dataList, that);
          /*that.get_history_man(function () {
          });*/
        }, 500);
      },

      /**
       * 初始化邮箱检测数据排名。
       */
      init_emailSort() {
        var that = this;
        var svg = d3.select("svg#email_sort");

        var params = {
          width: 330,
          height: 220,
          rectPadding: 20,
          rect_radius: 3,
          effectTime: 1000
        };
        var email_sort = new emailSort(svg, params);
        this.email_sort = email_sort;
      },

      /**
       * 阻止事件冒泡。
       * */
      NoBulle: function (ev) {
        var e = ev || window.event;
        if (e.stopPropagation)
          e.stopPropagation();
        else
          e.cancelBubble = true;
      },
      // 获取最小值到最大值之前的整数随机数
      GetRandomNum:function(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
      },
      /**
       * 初始化企业攻击邮箱。
       */
      init_group_ask_email(groupList, emailList, employeeList) {
        var that = this;
        var svg = d3.select("svg#group_ask_email");
        var group_ask_email_dom = document.querySelector('.group_ask_email');
        var width = group_ask_email_dom.offsetWidth;
        var height = group_ask_email_dom.offsetHeight;
        // 加载企业攻击邮箱。
        var group_ask_params = {
          width: width,
          height: height,
          padding: {left: 210},
          lineTime: 1500,
          lineLeft: 20,
          lineHide: 1000,
          Open_Win: function (ev, d, name) {
            that.NoBulle(ev);
            console.log(d)
            that.Open_WinInfo(ev, d.sender, "", "ask_line", d.receiver);
          }
        };
        var group_ask = new group_ask_email(svg, group_ask_params);
        group_ask.init(groupList, emailList);
        this.group_ask = group_ask;

        that.get_nowAskCount(new Date(that.initTime).Format("yyyy-MM-dd hh:mm:ss"), function (data) {
          that.group_ask.Reset_Number(data);
        });
        this.employeeList = employeeList;

        // 初始化部门监测数据排名。
        that.init_depart_sort();

        // 初始化人员监控。
        that.init_person_monitoring(employeeList);

        var t = 0;
        // 初始化邮箱检测数据排名。
        that.init_emailSort()

        that.init_pieChart_ring();
        var run_only = false;// 是否运行一次。
        function getask(step) {
          if (step) {
            this.huifangTime_Temp = new Date(that.initTime).Format("yyyy-MM-dd hh:mm:ss");
          }
          // 从服务端获取邮件发送数据，并加载显示。
          var endTime = new Date(that.initTime);
          endTime.setMinutes(endTime.getMinutes() + parseInt(step || 1), endTime.getSeconds(), 0);
          if (step && endTime > new Date()) {
            endTime = new Date();
            this.huifangTime_Temp = endTime.Format("yyyy-MM-dd hh:mm:ss");
            run_only = true;
          }

          var url = that.server_url + "/monitor/getRealTime?startTimeDate=" + new Date(that.initTime).Format("yyyy-MM-dd hh:mm:ss") + "&endTimeDate=" + endTime.Format("yyyy-MM-dd hh:mm:ss") + "&type=" + (step === undefined ? 1 : 2) + "&firstTimeDate=" + that.firstTimeDate;
          //that.get_json(url, function (ask) {
            that.initTime = endTime.Format("yyyy-MM-dd hh:mm:ss");
            var ask = {
              resultCode:0,
              data:{
                mailSendList:[]
              }
            };
            if (ask.resultCode != 0) {
              console.error("获取实时数据出错了，详情：" + ask.resultMessage);
              return;
            }

            if (!ask.data.eventList || ask.data.eventList === null) {
              ask.data.eventList = [];
            }
            if (!ask.data.employeeSummaryList2 || ask.data.employeeSummaryList2 === null) {
              ask.data.employeeSummaryList2 = [];
            }
            if (!ask.data.mailSummaryList || ask.data.mailSummaryList === null) {
              ask.data.mailSummaryList = [];
            }
            if (!ask.data.employeeSummaryList || ask.data.employeeSummaryList === null) {
              ask.data.employeeSummaryList = [];
            }
            if (!ask.data.employeeStatusList || ask.data.employeeStatusList === null) {
              ask.data.employeeStatusList = [];
            }
            if (!ask.data.totalCount || ask.data.totalCount === null) {
              ask.data.totalCount = 0;
            }
            if (!ask.data.totalInsecurityCount || ask.data.totalInsecurityCount === null) {
              ask.data.totalInsecurityCount = 0;
            }
            if (!ask.data.receiveInsecurityCount || ask.data.receiveInsecurityCount === null) {
              ask.data.receiveInsecurityCount = 0;
            }
            if (!ask.data.outReceiveInsecurityCount || ask.data.outReceiveInsecurityCount === null) {
              ask.data.outReceiveInsecurityCount = 0;
            }
          ask.data.pendingFileList = [
            {
              count:5,fileTypeId:1,
            },
            {
              count:5,fileTypeId:2,
            },
            {
              count:5,fileTypeId:3,
            },
            {
              count:15,fileTypeId:4,
            },
            {
              count:3,fileTypeId:5,
            },
          ];
            if (ask.data.pendingFileList && ask.data.pendingFileList.length > 0) {
              var pendingData = ask.data.pendingFileList;
              for (var i = 0; i < pendingData.length; i++) {
                var source = pendingData[i];
                var count = source.count || 0;
                that.pendingFileList[source.fileTypeId] = {sumCount: count};
                that.pendingFileList[source.fileTypeId].count = count > 4 ? 4 : count;
              }
            }

            //加载小人数据
          var init_person_data = function(){
            ask.data.eventList = [
              {eventName:"上网",ip:"192.168.1.1",departmentName:"情报部",fileName:"sys.bat",datetime:new Date().Format("yyyy-MM-dd hh:mm"),type:parseInt(that.GetRandomNum(0, 1))},
              ];
            var eventList = ask.data.eventList;
            for(var i=0;i<20;i++){
              var item = eventList[0];
              switch(parseInt(that.GetRandomNum(1, 6))){
                case 1:
                  item.eventName = "上网";
                  item.departmentName = "网络部";
                  break;
                case 2:
                  item.eventName = "优盘";
                  item.departmentName = "网络部";
                  break;
                case 3:
                  item.eventName = "本机";
                  break;
                case 4:
                  item.eventName = "文件";
                  break;
                case 5:
                  item.eventName = "邮箱";
                  break;
                case 6:
                  item.eventName = "外网";
                  break;
              }
              item.departmentName = "网络部";
              eventList.push(item);
            }
          }
          init_person_data();

            that.eventList = ask.data.eventList;
            for (var i = 0; i < that.eventList.length; i++) {
              var item = that.eventList[i];
              item.img = "";
              switch (item.eventName) {
                case "上网":
                  item.img = "browser";
                  break;
                case "优盘":
                  item.img = "disk";
                  break;
                case "本机":
                  item.img = "browser";
                  break;
                case "文件":
                  item.img = "folder";
                  break;
                case "邮箱":
                  item.img = "mail";
                  break;
                case "外网":
                  item.img = "browser";
                  break;
                default:
                  item.img = "browser";
                  break;
              }
              item.datetime = new Date(item.datetime).Format("yyyy-MM-dd hh:mm")
            }

            var employeeSummaryList2 = ask.data.employeeSummaryList2;


          for(var i=0;i<5;i++){
            employeeSummaryList2.push({departmentName:"情报部" + i,children:[
                {name:"qq",count:parseInt(that.GetRandomNum(1,60))},
                {name:"folder",count:parseInt(that.GetRandomNum(1,60))},
                {name:"dist",count:parseInt(that.GetRandomNum(1,60))},
                {name:"ie",count:parseInt(that.GetRandomNum(1,60))},
                {name:"email",count:parseInt(that.GetRandomNum(1,60))},
              ]});
            }

            ask.data.employeeSummaryList2 = Enumerable.from(ask.data.employeeSummaryList2).select("{name:$.departmentName,children:$.children}").toArray();
            if (ask.data.employeeSummaryList2.length > 0) {
              if (that.employeeSummaryList2) {
                that.email_sort_right2.change(ask.data.employeeSummaryList2);
              } else
                that.email_sort_right2.init(ask.data.employeeSummaryList2);
              that.employeeSummaryList2 = ask.data.employeeSummaryList2;
            } else {
              that.email_sort_right2.clear();
            }

            if (ask.data.mailSummaryList.length <= 5 && ask.data.mailSummaryList.length > 0) {
              var totalCount = 0;
              for (var index = 1; index <= 5; index++) {
                d3.select("#email_bm" + index).text(ask.data.mailSummaryList[index - 1].count);
                totalCount += ask.data.mailSummaryList[index - 1].count;
              }
              d3.select("#email_totalCount").text(totalCount);
            }

            var employeeSummaryList = ask.data.employeeSummaryList;
          for(var i=0;i<5;i++){
            employeeSummaryList.push({departmentName:"情报部门" + (i + 1),count:parseInt(that.GetRandomNum(1,20))});
          }
            // 初始化饼图（右边）。
            if (ask.data.employeeSummaryList.length > 0) {
              if (that.employeeSummaryList_Pre) {
                that.pie_ring.change(ask.data.employeeSummaryList);
              } else {
                that.pie_ring.init(ask.data.employeeSummaryList);
              }
              that.employeeSummaryList_Pre = ask.data.employeeSummaryList;
            }
            if (ask.data.employeeSummaryList.length <= 5 && ask.data.employeeSummaryList.length > 0) {
              var totalCount = 0;
              for (var index = 1; index <= 5; index++) {
                if (!ask.data.employeeSummaryList[index - 1]) continue;
                d3.select("#employee_bm" + index).text(ask.data.employeeSummaryList[index - 1].count);
                totalCount += ask.data.employeeSummaryList[index - 1].count;
              }
              d3.select("#employee_totalCount").text(totalCount);
            }

            // 人员监控攻击数据。

          ask.data.employeeStatusList = [
            {employeeId:1,mailStatus:2,copyFileStatus:1,fileStatus:2,status:1,mailEffect:1,copyFileEffect:1},
          ];
          var employeeStatusList = ask.data.employeeStatusList;
            for(var i=0;i<20;i++){
              var item = JSON.parse(JSON.stringify(employeeStatusList[0]));
              item.employeeId = that.GetRandomNum(1, 60);
              item.mailStatus = that.GetRandomNum(0, 2);
              item.copyFileStatus = that.GetRandomNum(0, 2);
              item.fileStatus = that.GetRandomNum(0, 2);
              item.status = that.GetRandomNum(0, 1);
              item.mailEffect = that.GetRandomNum(0, 1);
              item.copyFileEffect = that.GetRandomNum(0, 1);
              item.fileEffect = that.GetRandomNum(0, 1);
              item.imEffect = that.GetRandomNum(0, 1);
              item.internetEffect = that.GetRandomNum(0, 1);

              employeeStatusList.push(item);
            }

            if (ask.data.employeeStatusList.length > 0) {
              that.person.get_ask(ask.data.employeeStatusList);
            }
            for (var i = 0; i < ask.data.employeeStatusList.length; i++) {
              var item = ask.data.employeeStatusList[i];
              var source = Enumerable.from(that.employeeStatusList).where("$.employeeId==" + item.employeeId).toArray()[0];
              if (source) {
                for (var one in item) {
                  source[one] = item[one];
                }
              } else {
                that.employeeStatusList.push(item);
              }
            }

            // 显示总的统计数据。
            that.displayTotalCount(ask.data.totalCount, ask.data.totalInsecurityCount);

            // 显示公司收取邮件的数据。
            d3.select("#receiveInsecurityCount").text(ask.data.receiveInsecurityCount);
            d3.select("#receiveCount").text(ask.data.receiveCount || "0");

            // 显示公司收取统计。
            that.outReceiveInsecurityCount = ask.data.outReceiveInsecurityCount.toString();
            that.outReceiveCount = (ask.data.outReceiveCount || 0).toString();



          ask.data.mailSendList = [];

          //制造炮弹攻击数据
          var init_ask_data = function () {
            var ask_data = function (type) {
              var num = 0;
              var num2 = 0;
              switch (type){
                case 1:
                  num = that.GetRandomNum(101, 134);
                  num2 = that.GetRandomNum(101, 134);
                  break;
                case 2:
                  num = that.GetRandomNum(200, 205);
                  num2 = that.GetRandomNum(101, 134);
                  break;
                case 3:
                  num = that.GetRandomNum(200, 205);
                  num2 = that.GetRandomNum(200, 205);
                  break;
                default:
                  num = that.GetRandomNum(101, 134);
                  num2 = that.GetRandomNum(200, 205);
                  break;
              }
              if(num === num2) return;
              ask.data.mailSendList.push({sender:num,receiver:num2,type:type,insecurityCount:parseInt(Math.random()*2)})
            }
            for(var i=0;i<10;i++){
              ask_data("");
              ask_data(2);
            }
            for(var i=0;i<50;i++){
              ask_data(1);
              ask_data(3);
            }
          }
          init_ask_data();

            // 邮箱攻击列表滚动。
            var attackRequestCount = 20;
            var attackRequestInterval = 5;
            if (ask.data.mailSendList.length > 0) {
              var askArr = ask.data.mailSendList;
              for (var i = 0; i < askArr.length; i++) {
                var item = askArr[i];
                switch (item.type) {
                  case 1:
                    var name = Enumerable.from(groupList.children).where("$.id==" + item.sender).toArray()[0];
                    item.send_name = name ? name.group : "";
                    name = Enumerable.from(groupList.children).where("$.id==" + item.receiver).toArray()[0];
                    item.receiver_name = name ? name.group : "";
                    break;
                  case 2:
                    var name = Enumerable.from(emailList.children).where("$.id==" + item.sender).toArray()[0];
                    item.send_name = name ? name.name : "";
                    name = Enumerable.from(groupList.children).where("$.id==" + item.receiver).toArray()[0];
                    item.receiver_name = name ? name.group : "";
                    break;
                  case 3:
                    var name = Enumerable.from(emailList.children).where("$.id==" + item.sender).toArray()[0];
                    item.send_name = name ? name.name : "";
                    name = Enumerable.from(emailList.children).where("$.id==" + item.receiver).toArray()[0];
                    item.receiver_name = name ? name.name : "";
                    break;
                  case 4:
                    if (item.sender > 200) {
                      var name = Enumerable.from(emailList.children).where("$.id==" + item.sender).toArray()[0];
                      item.send_name = name ? name.name : "";
                      name = Enumerable.from(emailList.children).where("$.id==" + item.receiver).toArray()[0];
                      item.receiver_name = name ? name.name : "";
                    } else {
                      var name = Enumerable.from(groupList.children).where("$.id==" + item.sender).toArray()[0];
                      item.send_name = name ? name.name : "";
                      name = Enumerable.from(groupList.children).where("$.id==" + item.receiver).toArray()[0];
                      item.receiver_name = name ? name.name : "";
                    }
                    break;
                  default:
                    var name = Enumerable.from(groupList.children).where("$.id==" + item.sender).toArray()[0];
                    item.send_name = name ? name.group : "";
                    name = Enumerable.from(emailList.children).where("$.id==" + item.receiver).toArray()[0];
                    item.receiver_name = name ? name.name : "";
                    break;
                }
              }

              that.new_add_count = (that.new_add_count || 0) + ask.data.mailSendList.length / attackRequestInterval;
              that.new_add_count = parseInt(that.new_add_count) <= 0 ? 1 : that.new_add_count;
              that.group_ask_list = that.group_ask_list.concat(ask.data.mailSendList.slice(0, that.new_add_count));
              if (that.group_ask_list.length > attackRequestCount) {
                var remove_count = that.group_ask_list.length - attackRequestCount;
                that.group_ask_list.splice(0, remove_count);
              }
            }

            setTimeout(function () {
              var attack_ul = document.querySelectorAll("#attack_list_ul")[0];
              var attack_li = attack_ul.querySelectorAll("li");
              attack_li = attack_li[attack_li.length - 1];
              if (attack_li)
                attack_ul.scrollTop = attack_li.offsetTop;
            }, 50);

            // 邮箱攻击动态效果。
            var mailSendList = ask.data.mailSendList;
            group_ask.get_ask(mailSendList, that.play_type === "js" ? "realtime" : "playback");
            if (run_only) {
              run_only = false;
              return;
            }
            that.BoFang_Timeout = setTimeout(function () {
              that.getask(step);
            }, config.poll_time);
          //});
        }

        that.getask = getask;
        setTimeout(function () {
          getask();
        }, 500);
      },

      /**
       * 显示总的统计数据，和比例。
       */
      displayTotalCount(totalCount, totalInsecurityCount) {
        d3.select("#totalCount").text(totalCount);
        d3.select("#totalInsecurityCount").text(totalInsecurityCount);
        var percentage = d3.select("#percentage")[0];

        // 计算红色所占的比例，随机生成。
        var percent = Math.round(Math.random() * 17);

        for (var index = 0; index < percentage[0].children.length; index++) {
          if (17 - percent < index) {
            percentage[0].children[index].className = "red";
          } else {
            percentage[0].children[index].className = "";
          }
        }
      },

      /**
       * 从指定URL读取JSON数据。
       */
      get_json(url, cb, type, is_returnName) {
        if (is_returnName) {
          var http_name = d3.json(url, function (error, data) {
            if (error) {
              console.error(error);
              return;
            }
            cb(data);
          });
          return http_name;
        } else if (type) {
          this[type] = d3.json(url, function (error, data) {
            if (error) {
              console.error(error);
              return;
            }
            cb(data);
          });
        } else if (url.indexOf("getRealTime") > -1) {
          this.getRealTime_HTTP = d3.json(url, function (error, data) {
            if (error) {
              console.error(error);
              return;
            }
            cb(data);
          });
        } else {
          d3.json(url, function (error, data) {
            if (error) {
              console.error(error);
              return;
            }
            cb(data);
          });
        }
      },

      /**
       * 获取基础数据。
       */
      getBase: function () {
        var that = this;
        //this.get_json(this.server_url + "/monitor/getBase1", function (data) {
          var data = {resultCode:0,data:{companyList:[],emailList:[],employeeGroupList:[]}};
          if (data.resultCode != 0) {
            alert(data.resultMessage);
          } else {
            data = data.data;
            that.initTime = new Date();
            that.get_json("/static/data/groupList.json", function (group_params) {
              group_params = group_params.children;
              console.log(group_params)
              var groupList_temp = group_params || data.companyList;
              for (var i = 0; i < groupList_temp.length; i++) {
                var item = groupList_temp[i];
                item.group = item.group;
                item.hasHeadOffice = item.hasHeadOffice;
                item.paddingTop = group_params[i] ? group_params[i].paddingTop : 0;
              }
              var groupList = {"children": groupList_temp};
              that.get_json("/static/data/emailList.json", function (emailList){
                console.log(emailList)
                var emailList = {
                  "children": Enumerable.from(emailList.children).select(function (item) {
                    /*item.desc = item.emailArea;*/
                    switch (item.name) {
                      case "126邮箱":
                        item.email = "mail_126";
                        break;
                      case "163邮箱":
                        item.email = "mail_163";
                        break;
                      case "QQ邮箱":
                        item.email = "mail_qq";
                        break;
                      case "Outlook邮箱":
                        item.email = "mail_outlook";
                        break;
                      case "阿里邮箱":
                        item.email = "mail_ali";
                        break;
                      case "其他邮箱":
                        item.email = "mail_other";
                        break;
                    }
                    return item;
                  }).toArray()
                };
                data.employeeGroupList = [
                  {
                    category: 1,
                    employeeList: [
                      {employeeId:1, id:1, name:"周华健", employeeIps:['192.178.1.1'], categroy:1, email:"q@qq.com"},
                    ]
                  },
                  {
                    category: 2,
                    employeeList: [
                      {employeeId:1, id:1, name:"周华健", employeeIps:['192.178.1.1'], categroy:1, email:"q@qq.com"},
                    ]
                  },
                  {
                    category: 3,
                    employeeList: [
                      {employeeId:1, id:1, name:"周华健", employeeIps:['192.178.1.1'], categroy:1, email:"q@qq.com"},
                    ]
                  },{
                    category: 4,
                    employeeList: [
                      {employeeId:1, id:1, name:"周华健", employeeIps:['192.178.1.1'], categroy:1, email:"q@qq.com"},
                    ]
                  }

              ];
                var employeeList = data.employeeGroupList[0].employeeList;
                for(var i=0;i<50;i++){
                  var item = JSON.parse(JSON.stringify(employeeList[0]));
                  item.employeeId = i + 2;
                  item.id = item.employeeId;
                  employeeList.push(item);
                }
                that.employeeGroupList = data.employeeGroupList;

                var employeeList = [];
                for (var i = 0; i < data.employeeGroupList.length; i++) {
                  var data_item = data.employeeGroupList[i];
                  if (data_item.employeeList.length > 0) {
                    employeeList = employeeList.concat(data_item.employeeList);
                  }
                }
                that.init_group_ask_email(groupList, emailList, employeeList);
              });

            });
          }
        //});
      },

      /**
       * 获取左侧国秘、规划数据。
       */
      getPendingEmails: function (type, url_type, receiverId) {
        var that = this;
        that.PendingEmails_Arr = [];
        that.getPendingEmails_type = type;
        var params = "";
        var method = "";
        if (url_type === "ask_line") {
          if (that.play_type === "js") {
            params = "wayType=1";
          } else {
            params = "wayType=2&startTime=" + new Date(this.huifangTime_first_time).Format("yyyy-MM-dd") + " 00:00:00&endTime=" + new Date(this.huifangTime_Temp).Format("yyyy-MM-dd hh:mm");
          }
          params += "&senderId=" + type + "&receiverId=" + receiverId;
          method = "getPendingEmails2";
        } else {
          if (that.play_type === "js") {
            params = "wayType=1";
          } else {
            params = "wayType=2&startTime=" + new Date(this.huifangTime_first_time).Format("yyyy-MM-dd") + " 00:00:00&endTime=" + new Date(this.huifangTime_Temp).Format("yyyy-MM-dd hh:mm");
          }
          params += "&type=" + type;
          method = "getPendingEmails";
        }
        this.get_json(this.server_url + "/monitor/" + method + "?" + params, function (data) {
          if (data.resultCode != 0) {
            alert(data.resultMessage);
          } else {
            data = data.data;
            that.PendingEmails_Arr = data;
          }
        });
      },

      /**
       * 获取当前攻击数据数量。
       */
      get_nowAskCount: function (time, cb) {
        var that = this;
        that.PendingEmails_Arr = [];
        cb([]);
        return;
        this.get_json(this.server_url + "/monitor/getEmailSummary?endTimeDate=" + time, function (data) {
          if (data.resultCode != 0) {
            alert(data.resultMessage);
          } else {
            data = data.data;
            cb(data);
          }
        });
      },

      /**
       * 打开弹出面板。
       */
      open_man_win: function (type, ev, employeeId) {
        var that = this;
        var e = ev || window.event;
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }

        this.open_man.is_open_man = true;
        this.open_man.x = ev.x;
        this.open_man.y = ev.y;
        if (document.body.offsetWidth < 608 + ev.x) {
          that.open_man.x = that.open_man.x - 608;
        }
        var url = "";
        that.open_man.rows = [];
        that.open_man.other_status = type;
        switch (type) {
          case "qq":
            this.open_man.columns = [
              {name: "源IP", width: "25%", key: "sourceIP"},
              {name: "告警类型", width: "25%", key: "alarmType"},
              {name: "告警时间", width: "25%", key: "alarmTime"},
            ];
            url = "/monitor/getInsecurityImList";
            break;
          case "browse":
            this.open_man.columns = [
              {name: "源IP", width: "20%", key: "sourceIP"},
              {name: "告警类型", width: "20%", key: "alarmType"},
              {name: "访问URL", width: "20%", key: "url"},
              {name: "告警时间", width: "20%", key: "alarmTime"},
            ];
            url = "/monitor/getInsecurityWebList";
            break;
          case "email":
            this.open_man.columns = [
              {name: "源IP", width: "20%", key: "sourceIP"},
              {name: "告警类型", width: "20%", key: "alarmType"},
              {name: "邮件主题", width: "20%", key: "subject"},
              {name: "告警时间", width: "20%", key: "alarmTime"},
            ];
            url = "/monitor/getInsecurityEmailList";
            break;
        }
        that.open_man.employeeId = employeeId;
        this.get_json(this.server_url + url + "?employeeId=" + employeeId, function (data) {
          that.open_man.rows = data.data;
        })
      },

      /**
       * 处理小人周围5个图标的异常数据。
       */
      processEmail: function (action, data_id) {
        //return;
        var method = "";
        var that = this;
        var cb = function (result) {
          if (result.status === 0) {
            var img_type = that.open_man.other_status;
            switch (that.open_man.other_status) {
              case "email":
                img_type = "mail";
                break;
              case "browse":
                img_type = "browser";
                break;
            }
            that.person.change_other_status(that.open_man.employeeId, img_type);
          }
          if (result.success) {
            var item = Enumerable.from(that.open_man.rows).where("$.id==" + data_id).toArray()[0];
            if (item) {
              that.open_man.rows.splice(that.open_man.rows.indexOf(item), 1);
            }
          }
          if (that.open_man.rows.length === 0) {
            that.open_man.is_open_man = false;
          }

          that.person.change_man_status(result.employeeStatus);
        }
        switch (that.open_man.other_status) {
          case "email":
            method = "processEmail";
            break;
          case "qq":
            method = "processIm";
            break;
          case "browse":
            method = "processWeb";
            break;
        }
        this.get_json(this.server_url + "/monitor/" + method + "?id=" + data_id + "&action=" + action, function (data) {
          if (data.resultCode != 0) {
            alert(data.resultMessage);
          } else {
            data = data.data;
            cb(data);
          }
        });
      },

      /**
       * 处理攻击线条数据。
       */
      change_emailStatus: function (id, action, ev) {
        this.NoBulle(ev);
        var that = this;
        var cb = function (result) {
          if (result.status === 0) {
            that.group_ask.remove_askline(result.senderId, result.receiverId, result.type);
          }
          if (result.success) {
            var item = Enumerable.from(that.PendingEmails_Arr).where("$.id==" + id).toArray()[0];
            if (item) {
              that.PendingEmails_Arr.splice(that.PendingEmails_Arr.indexOf(item), 1);
            }
          }
          if (that.PendingEmails_Arr.length === 0) {
            that.open_win = false;
            that.open_ask_line.is_open = false;
          }
        }

        var params = "";
        if (that.play_type === "js") {
          params = "&type=1";
        } else {
          params = "&type=2&startTime=" + new Date(this.huifangTime_first_time).Format("yyyy-MM-dd") + " 00:00:00&endTime=" + new Date(this.huifangTime_Temp).Format("yyyy-MM-dd hh:mm");
        }
        this.get_json(this.server_url + "/monitor/processPendingEmail?id=" + id + "&action=" + action + params, function (data) {
          if (data.resultCode != 0) {
            alert(data.resultMessage);
          } else {
            data = data.data;
            cb(data);
          }
        });
      },

      /**
       * 切换小人。
       */
      cast_man: function (type) {
        var that = this;
        this.man_active = type;
        var dataList = Enumerable.from(this.employeeGroupList).where("$.category==" + type).toArray()[0];
        if (dataList)
          dataList = dataList.employeeList;
        dataList = dataList || [];
        dataList = Enumerable.from(dataList).select("{employeeId:$.id,id:$.id,name:$.name,employeeIps:$.employeeIps,categroy:$.categroy,email:$.email}").toArray();
        this.person.init(dataList, this);
        if (this.employeeStatusList.length > 0) {
          this.person.change_status(JSON.parse(JSON.stringify(this.employeeStatusList)));
        }
      },

      /**
       * 获取小人历史数据。
       */
      get_history_man: function (cb) {
        var reset_data = JSON.parse(JSON.stringify(this.employeeList));
        for (var i = 0; i < reset_data.length; i++) {
          var item = reset_data[i];
          item.mailStatus = 0;
          item.copyFileStatus = 0;
          item.fileStatus = 0;
          item.imOnlineStatus = 0;
          item.internetStatus = 0;
          item.status = 0;
          var source = Enumerable.from(this.employeeStatusList).where("$.employeeId==" + item.employeeId).toArray()[0];
          if (source) {
            source.mailStatus = 0;
            source.copyFileStatus = 0;
            source.fileStatus = 0;
            source.imOnlineStatus = 0;
            source.internetStatus = 0;
            source.status = 0;
          }
        }

        if (reset_data.length > 0)
          this.person.change_status(reset_data);
        var params = "";
        if (this.play_type === "js") {
          params = "type=1&endTime=" + new Date().Format("yyyy-MM-dd hh:mm");
        } else {
          params = "type=2&startTime=" + new Date(this.huifangTime_Temp).Format("yyyy-MM-dd") + " 00:00:00&endTime=" + this.huifangTime_Temp;
        }
        var that = this;
        var http_name = "getHistoryEmployeeStatusList_HTTP_";
        var init_count = that.employeeList.length / config.man_initCount;
        if (init_count % 2 !== 0)
          init_count++;
        setTimeout(function () {
          for (var i = 0; i < init_count; i++) {
            var ids = that.employeeList.slice(i * config.man_initCount, config.man_initCount * (i + 1));
            if (ids.length > 0) {
              ids = Enumerable.from(ids).select("$.employeeId").toArray(",");
              ids = ids.join(",");
              if (that.getHistoryEmployeeStatusList_HTTP[http_name + i]) {
                that.getHistoryEmployeeStatusList_HTTP[http_name + i].abort();
                delete that.getHistoryEmployeeStatusList_HTTP[http_name + i];
              }
              post_man(i, ids);
            }
          }
        }, 50);
        var dataLength = 0;

        function post_man(number, ids) {
          that.getHistoryEmployeeStatusList_HTTP[http_name + number] = that.get_json(that.server_url + "/monitor/getHistoryEmployeeStatusList?" + params + "&employeeIds=" + ids, function (data) {
            if (data.resultCode != 0) {
              alert(data.resultMessage);
            } else {
              data = data.data;
              for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var source = Enumerable.from(that.employeeStatusList).where("$.employeeId==" + item.employeeId).toArray()[0];
                if (source) {
                  for (var one in item) {
                    source[one] = item[one];
                  }
                } else {
                  that.employeeStatusList.push(item);
                }
              }
              dataLength += data.length;
              if (that.employeeStatusList.length > 0)
                that.person.change_status(that.employeeStatusList || []);
              if (dataLength === that.employeeList.length) {
                cb();
              }
            }
          }, "", true);
        }
      }
    }
  }
</script>
