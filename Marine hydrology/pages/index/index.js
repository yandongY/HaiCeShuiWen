var app = getApp();
var adUrl = app.adUrl;
var weatherUrl = app.weatherUrl;
var lineChart = null;
var wxCharts = require('../../utils/wxcharts.js');
///////123
Page({
  data: {
    show:true,
    province_index:'省份',
    port_index:'港口',
    collection_index:'我的收藏',
    waterLevel:'241', //潮高基准面：默认天津
    province:'天津', //默认天津
    port:'塘沽',  //默认塘沽
    dateTime:'',   //当天阳历时间
    lunarCalendar:'', //当天农历时间,
    tableName: ['满潮', '干潮', '满潮', '干潮'],
    tableColor: ['#e70014','#34ab35'],
    city1: ["辽宁省", "河北省", "天津市","山东省" , "江苏省" ,"上海市" , "浙江省" , "福建省" , "台湾省" ,"广东省" , "香港" , "澳门" , "海南省" ,"广西省" ,"三沙市" ,"其他"],
    city2: [
      { "id": "0", "province": "辽宁省" },
      { "id": "1", "province": "天津市" },
      { "id": "2", "province": "河北省" },
      { "id": "3", "province": "山东省" },
      { "id": "4", "province": "江苏省" },
      { "id": "5", "province": "上海市" },
      { "id": "6", "province": "浙江省" },
      { "id": "7", "province": "福建省" },
      { "id": "8", "province": "台湾省" },
      { "id": "9", "province": "广东省" },
      { "id": "10", "province": "香港" },
      { "id": "11", "province": "澳门" },
      { "id": "12", "province": "海南省" },
      { "id": "13", "province": "广西省" },
      { "id": "14", "province": "三沙市" },
      { "id": "15", "province": "其他" },
    ],
    portArray: [],
    listArray:[],
    list001: ["丹东","丹东新港","石山子", "大鹿岛", "小长山岛", "大窑湾","大连","旅顺新港","金县","葫芦岛","长兴岛", "鲅鱼圈区", "营口", "老北河口", "锦州港", "菊花岛","团山角","芷锚湾",],
    list01:[
      { "id": "1", "province": "辽宁省", "port": "丹东", "longitude": "124.4", "latitude": "40.13", "waterLevel": "150" },
      { "id": "2", "province": "辽宁省", "port": "丹东新港", "longitude": "124.14", "latitude": "39.83", "waterLevel": "354" },
      { "id": "3", "province": "辽宁省", "port": "石山子", "longitude": "123.67", "latitude": "39.96", "waterLevel": "200" },
      { "id": "4", "province": "辽宁省", "port": "大鹿岛", "longitude": "123.75", "latitude": "39.75", "waterLevel": "332" },
      { "id": "5", "province": "辽宁省", "port": "小长山岛", "longitude": "122.67", "latitude": "39.22", "waterLevel": "232" },
      { "id": "6", "province": "辽宁省", "port": "大窑湾", "longitude": "121.9", "latitude": "38.98", "waterLevel": "190" },
      { "id": "7", "province": "辽宁省", "port": "大连", "longitude": "121.65", "latitude": "38.93", "waterLevel": "163" },
      { "id": "8", "province": "辽宁省", "port": "旅顺新港", "longitude": "121.13", "latitude": "38.79", "waterLevel": "145" },
      { "id": "9", "province": "辽宁省", "port": "金县", "longitude": "121.53", "latitude": "39.04", "waterLevel": "150" },
      { "id": "10", "province": "辽宁省", "port": "葫芦岛", "longitude": "121.6", "latitude": "39.26", "waterLevel": "130" },
      { "id": "11", "province": "辽宁省", "port": "长兴岛", "longitude": "121.46", "latitude": "39.62", "waterLevel": "101" },
      { "id": "12", "province": "辽宁省", "port": "鲅鱼圈区", "longitude": "122.09", "latitude": "40.29", "waterLevel": "194" },
      { "id": "13", "province": "辽宁省", "port": "营口", "longitude": "122.15", "latitude": "40.62", "waterLevel": "200" },
      { "id": "14", "province": "辽宁省", "port": "老北河口", "longitude": "121.83", "latitude": "40.95", "waterLevel": "209" },
      { "id": "15", "province": "辽宁省", "port": "锦州港", "longitude": "121.07", "latitude": "40.78", "waterLevel": "160" },
      { "id": "16", "province": "辽宁省", "port": "菊花岛", "longitude": "120.84", "latitude": "40.47", "waterLevel": "142" },
      { "id": "17", "province": "辽宁省", "port": "团山角", "longitude": "120.47", "latitude": "40.22", "waterLevel": "76" },
      { "id": "18", "province": "辽宁省", "port": "芷锚湾", "longitude": "119.93", "latitude": "40.01", "waterLevel": "75" },
],
    list002: ["山海关", "秦皇岛","七里海", "京唐港","曹妃甸",  "岐口", "埕口", "黄骅港",],
    list02: [
      { "id": "19", "province": "河北省", "port": "山海关", "longitude": "119.82", "latitude": "39.98", "waterLevel": "104" },
      { "id": "20", "province": "河北省", "port": "秦皇岛", "longitude": "119.62", "latitude": "39.91", "waterLevel": "91" },
      { "id": "21", "province": "河北省", "port": "七里海", "longitude": "119.28", "latitude": "39.58", "waterLevel": "130" },
      { "id": "22", "province": "河北省", "port": "京唐港", "longitude": "119.02", "latitude": "39.2", "waterLevel": "148" },
      { "id": "23", "province": "河北省", "port": "曹妃甸", "longitude": "118.49", "latitude": "38.86", "waterLevel": "178" },
      { "id": "25", "province": "河北省", "port": "岐口", "longitude": "117.52", "latitude": "38.6", "waterLevel": "253" },
      { "id": "26", "province": "河北省", "port": "埕口", "longitude": "118.41", "latitude": "38.5", "waterLevel": "201" },
      { "id": "27", "province": "河北省", "port": "黄骅港", "longitude": "117.89", "latitude": "38.31", "waterLevel": "240" },
    ],
    list003: ["塘沽"],
    list03:[
      { "id": "24", "province": "天津市", "port": "塘沽", "longitude": "117.79", "latitude": "38.97", "waterLevel": "241" },
],
    list004: ["东风港","湾湾沟口", "东营港","潍坊港","莱州港", "龙口", "蓬莱","南长山岛","砣矶岛", "北隍城岛", "烟台", "威海", "成山角","石岛", "张家埠","乳山口", "千里岩","女岛港", "青岛", "黄岛","董家口", "日照港","岚山港"],
    list04:[
        { "id": "28", "province": "山东省", "port": "东风港", "longitude": "118.17", "latitude": "38.24", "waterLevel": "166" },
        { "id": "29", "province": "山东省", "port": "湾湾沟口", "longitude": "118.45", "latitude": "38.19", "waterLevel": "130" },
        { "id": "30", "province": "山东省", "port": "东营港", "longitude": "118.97", "latitude": "38.09", "waterLevel": "100" },
        { "id": "31", "province": "山东省", "port": "潍坊港", "longitude": "119.18", "latitude": "37.21", "waterLevel": "120" },
        { "id": "32", "province": "山东省", "port": "莱州港", "longitude": "119.93", "latitude": "37.39", "waterLevel": "94" },
        { "id": "33", "province": "山东省", "port": "龙口", "longitude": "120.32", "latitude": "37.64", "waterLevel": "70" },
        { "id": "34", "province": "山东省", "port": "蓬莱", "longitude": "120.74", "latitude": "37.8", "waterLevel": "95" },
        { "id": "35", "province": "山东省", "port": "南长山岛", "longitude": "120.7", "latitude": "37.91", "waterLevel": "92" },
        { "id": "36", "province": "山东省", "port": "砣矶岛", "longitude": "120.75", "latitude": "38.16", "waterLevel": "89" },
        { "id": "37", "province": "山东省", "port": "北隍城岛", "longitude": "120.92", "latitude": "38.39", "waterLevel": "100" },
        { "id": "38", "province": "山东省", "port": "烟台", "longitude": "121.38", "latitude": "37.55", "waterLevel": "147" },
        { "id": "39", "province": "山东省", "port": "威海", "longitude": "122.13", "latitude": "37.51", "waterLevel": "130" },
        { "id": "40", "province": "山东省", "port": "成山角", "longitude": "122.68", "latitude": "37.37", "waterLevel": "94" },
        { "id": "41", "province": "山东省", "port": "石岛", "longitude": "122.43", "latitude": "36.88", "waterLevel": "166" },
        { "id": "42", "province": "山东省", "port": "张家埠", "longitude": "122.17", "latitude": "37.01", "waterLevel": "220" },
        { "id": "43", "province": "山东省", "port": "乳山口", "longitude": "121.48", "latitude": "36.79", "waterLevel": "220" },
        { "id": "44", "province": "山东省", "port": "千里岩", "longitude": "121.39", "latitude": "36.26", "waterLevel": "183" },
        { "id": "45", "province": "山东省", "port": "女岛港", "longitude": "120.87", "latitude": "36.36", "waterLevel": "220" },
        { "id": "46", "province": "山东省", "port": "青岛", "longitude": "120.3", "latitude": "36.08", "waterLevel": "239" },
        { "id": "47", "province": "山东省", "port": "黄岛", "longitude": "120.32", "latitude": "36.08", "waterLevel": "231" },
        { "id": "48", "province": "山东省", "port": "董家口", "longitude": "119.84", "latitude": "35.45", "waterLevel": "288" },
        { "id": "49", "province": "山东省", "port": "日照港", "longitude": "119.55", "latitude": "35.36", "waterLevel": "270" },
        { "id": "50", "province": "山东省", "port": "岚山港", "longitude": "119.37", "latitude": "35.07", "waterLevel": "310" },
      ],
    list005: ["连云港","燕尾","滨海港", "射阳河口", "新洋港","大丰港","弶港","洋口港","吕四","天生港"],
    list05: [
      { "id": "51", "province": "江苏省", "port": "连云港", "longitude": "119.42", "latitude": "34.75", "waterLevel": "290" },
      { "id": "52", "province": "江苏省", "port": "燕尾", "longitude": "119.78", "latitude": "34.48", "waterLevel": "278" },
      { "id": "53", "province": "江苏省", "port": "滨海港", "longitude": "120.27", "latitude": "34.25", "waterLevel": "165" },
      { "id": "54", "province": "江苏省", "port": "射阳河口", "longitude": "120.5", "latitude": "33.8", "waterLevel": "171" },
      { "id": "55", "province": "江苏省", "port": "新洋港", "longitude": "120.47", "latitude": "33.6", "waterLevel": "200" },
      { "id": "56", "province": "江苏省", "port": "大丰港", "longitude": "120.72", "latitude": "33.15", "waterLevel": "300" },
      { "id": "57", "province": "江苏省", "port": "弶港", "longitude": "120.86", "latitude": "32.72", "waterLevel": "301" },
      { "id": "58", "province": "江苏省", "port": "洋口港", "longitude": "121.43", "latitude": "32.42", "waterLevel": "406" },
      { "id": "59", "province": "江苏省", "port": "吕四", "longitude": "121.62", "latitude": "32.07", "waterLevel": "310" },
      { "id": "60", "province": "江苏省", "port": "天生港", "longitude": "120.76", "latitude": "32.02", "waterLevel": "150" }],
    list006:["佘山","崇明","中浚", "高桥","吴淞","黄埔公园", "芦潮港","金山嘴"],
    list06: [
      { "id": "61", "province": "上海市", "port": "佘山", "longitude": "122.3", "latitude": "31.36", "waterLevel": "229" },
      { "id": "62", "province": "上海市", "port": "崇明", "longitude": "121.63", "latitude": "31.52", "waterLevel": "214" },
      { "id": "63", "province": "上海市", "port": "中浚", "longitude": "121.9", "latitude": "31.11", "waterLevel": "225" },
      { "id": "64", "province": "上海市", "port": "高桥", "longitude": "121.57", "latitude": "31.35", "waterLevel": "197" },
      { "id": "65", "province": "上海市", "port": "吴淞", "longitude": "121.5", "latitude": "31.4", "waterLevel": "202" },
      { "id": "66", "province": "上海市", "port": "黄埔公园", "longitude": "121.48", "latitude": "31.23", "waterLevel": "154" },
      { "id": "67", "province": "上海市", "port": "芦潮港", "longitude": "121.82", "latitude": "30.79", "waterLevel": "267" },
      { "id": "68", "province": "上海市", "port": "金山嘴", "longitude": "121.37", "latitude": "30.74", "waterLevel": "307" }
    ],
    list007:["绿华山","大戢山","嵊山","乍浦","澉浦", "滩浒","海黄山","长涂", "岱山", "西码头","沈家门", "定海", "沥港", "宁波","镇海","北仑港","崎头角","梅山","西泽","石浦","旗门港","健跳","鱼山","下大陈","海门",  "海门港", "东门村", "坎门","大门岛","温州","瑞安", "南麂山"],
    list07: [
      { "id": "69", "province": "浙江省", "port": "绿华山", "longitude": "122.6", "latitude": "30.79", "waterLevel": "263" },
      { "id": "70", "province": "浙江省", "port": "大戢山", "longitude": "122.18", "latitude": "30.77", "waterLevel": "254" },
      { "id": "71", "province": "浙江省", "port": "嵊山", "longitude": "122.81", "latitude": "30.7", "waterLevel": "240" },
      { "id": "72", "province": "浙江省", "port": "乍浦", "longitude": "121.08", "latitude": "30.61", "waterLevel": "350" },
      { "id": "73", "province": "浙江省", "port": "澉浦", "longitude": "120.9", "latitude": "30.37", "waterLevel": "414" },
      { "id": "74", "province": "浙江省", "port": "滩浒", "longitude": "121.62", "latitude": "30.6", "waterLevel": "270" },
      { "id": "75", "province": "浙江省", "port": "海黄山", "longitude": "121.5", "latitude": "30.21", "waterLevel": "214" },
      { "id": "76", "province": "浙江省", "port": "长涂", "longitude": "122.31", "latitude": "30.25", "waterLevel": "238" },
      { "id": "77", "province": "浙江省", "port": "岱山", "longitude": "122.2", "latitude": "30.24", "waterLevel": "190" },
      { "id": "78", "province": "浙江省", "port": "西码头", "longitude": "122.13", "latitude": "30.11", "waterLevel": "210" },
      { "id": "79", "province": "浙江省", "port": "沈家门", "longitude": "122.3", "latitude": "29.93", "waterLevel": "252" },
      { "id": "80", "province": "浙江省", "port": "定海", "longitude": "122.07", "latitude": "29.99", "waterLevel": "226" },
      { "id": "81", "province": "浙江省", "port": "沥港", "longitude": "121.85", "latitude": "30.05", "waterLevel": "205" },
      { "id": "82", "province": "浙江省", "port": "宁波", "longitude": "121.55", "latitude": "29.87", "waterLevel": "180" },
      { "id": "83", "province": "浙江省", "port": "镇海", "longitude": "121.73", "latitude": "29.98", "waterLevel": "207" },
      { "id": "84", "province": "浙江省", "port": "北仑港", "longitude": "121.85", "latitude": "29.93", "waterLevel": "176" },
      { "id": "85", "province": "浙江省", "port": "崎头角", "longitude": "122.11", "latitude": "29.89", "waterLevel": "240" },
      { "id": "86", "province": "浙江省", "port": "梅山", "longitude": "122.01", "latitude": "29.81", "waterLevel": "234" },
      { "id": "87", "province": "浙江省", "port": "西泽", "longitude": "121.83", "latitude": "29.61", "waterLevel": "269" },
      { "id": "88", "province": "浙江省", "port": "石浦", "longitude": "121.95", "latitude": "29.16", "waterLevel": "307" },
      { "id": "89", "province": "浙江省", "port": "旗门港", "longitude": "121.47", "latitude": "29.13", "waterLevel": "379" },
      { "id": "90", "province": "浙江省", "port": "健跳", "longitude": "121.6", "latitude": "29.02", "waterLevel": "350" },
      { "id": "91", "province": "浙江省", "port": "鱼山", "longitude": "122.27", "latitude": "28.87", "waterLevel": "251" },
      { "id": "92", "province": "浙江省", "port": "下大陈", "longitude": "121.9", "latitude": "28.45", "waterLevel": "299" },
      { "id": "93", "province": "浙江省", "port": "海门", "longitude": "121.45", "latitude": "28.68", "waterLevel": "290" },
      { "id": "94", "province": "浙江省", "port": "海门港", "longitude": "121.64", "latitude": "28.7", "waterLevel": "331" },
      { "id": "95", "province": "浙江省", "port": "东门村", "longitude": "121.22", "latitude": "28.33", "waterLevel": "430" },
      { "id": "96", "province": "浙江省", "port": "坎门", "longitude": "121.29", "latitude": "28.07", "waterLevel": "330" },
      { "id": "97", "province": "浙江省", "port": "大门岛", "longitude": "121.04", "latitude": "27.93", "waterLevel": "363" },
      { "id": "98", "province": "浙江省", "port": "温州", "longitude": "120.65", "latitude": "28.03", "waterLevel": "296" },
      { "id": "99", "province": "浙江省", "port": "瑞安", "longitude": "121.18", "latitude": "27.61", "waterLevel": "310" },
      { "id": "100", "province": "浙江省", "port": "南麂山", "longitude": "121.05", "latitude": "27.44", "waterLevel": "315" }
    ],
    list008: ["三沙", "赛岐", "帮门", "罗源迹头", "黄岐", "马尾", "福清湾", "竹屿", "郎官", "闽江口（川石）", "闽江口（琯头）", "平潭", "三江口", "秀屿", "梯吴", "崇武", "后渚", "泉州（石湖）", "深沪港", "围头", "石井", "厦门", "将军澳", "石码", "东山"],
    list08: [
      { "id": "101", "province": "福建省", "port": "三沙", "longitude": "120.22", "latitude": "26.91", "waterLevel": "349" },
      { "id": "102", "province": "福建省", "port": "赛岐", "longitude": "119.66", "latitude": "26.96", "waterLevel": "417" },
      { "id": "103", "province": "福建省", "port": "帮门", "longitude": "119.58", "latitude": "26.74", "waterLevel": "482" },
      { "id": "104", "province": "福建省", "port": "罗源迹头", "longitude": "119.69", "latitude": "26.46", "waterLevel": "406" },
      { "id": "105", "province": "福建省", "port": "黄岐", "longitude": "119.88", "latitude": "26.33", "waterLevel": "369" },
      { "id": "106", "province": "福建省", "port": "马尾", "longitude": "119.47", "latitude": "25.96", "waterLevel": "296" },
      { "id": "107", "province": "福建省", "port": "福清湾", "longitude": "119.58", "latitude": "25.68", "waterLevel": "394" },
      { "id": "108", "province": "福建省", "port": "竹屿", "longitude": "119.73", "latitude": "25.51", "waterLevel": "391" },
      { "id": "109", "province": "福建省", "port": "郎官", "longitude": "119.3", "latitude": "25.57", "waterLevel": "427" },
      { "id": "110", "province": "福建省", "port": "闽江口（川石）", "longitude": "119.67", "latitude": "26.13", "waterLevel": "353" },
      { "id": "111", "province": "福建省", "port": "闽江口（琯头）", "longitude": "119.57", "latitude": "26.13", "waterLevel": "325" },
      { "id": "112", "province": "福建省", "port": "平潭", "longitude": "119.84", "latitude": "25.5", "waterLevel": "403" },
      { "id": "113", "province": "福建省", "port": "三江口", "longitude": "119.12", "latitude": "25.41", "waterLevel": "427" },
      { "id": "114", "province": "福建省", "port": "秀屿", "longitude": "118.97", "latitude": "25.2", "waterLevel": "407" },
      { "id": "115", "province": "福建省", "port": "梯吴", "longitude": "119.03", "latitude": "25.13", "waterLevel": "410" },
      { "id": "116", "province": "福建省", "port": "崇武", "longitude": "118.95", "latitude": "24.88", "waterLevel": "351" },
      { "id": "117", "province": "福建省", "port": "后渚", "longitude": "118.67", "latitude": "24.9", "waterLevel": "360" },
      { "id": "118", "province": "福建省", "port": "泉州（石湖）", "longitude": "118.7", "latitude": "24.81", "waterLevel": "366" },
      { "id": "119", "province": "福建省", "port": "深沪港", "longitude": "118.67", "latitude": "24.64", "waterLevel": "333" },
      { "id": "120", "province": "福建省", "port": "围头", "longitude": "118.57", "latitude": "24.51", "waterLevel": "322" },
      { "id": "121", "province": "福建省", "port": "石井", "longitude": "118.41", "latitude": "24.62", "waterLevel": "336" },
      { "id": "122", "province": "福建省", "port": "厦门", "longitude": "118.07", "latitude": "24.45", "waterLevel": "328" },
      { "id": "123", "province": "福建省", "port": "将军澳", "longitude": "117.9", "latitude": "24.02", "waterLevel": "273" },
      { "id": "124", "province": "福建省", "port": "石码", "longitude": "117.82", "latitude": "24.45", "waterLevel": "290" },
      { "id": "125", "province": "福建省", "port": "东山", "longitude": "117.53", "latitude": "23.73", "waterLevel": "216" }
    ],
    list009: ["马公", "基隆", "高雄", "下港", "乌石"],
    list09: [
      { "id": "126", "province": "台湾省", "port": "马公", "longitude": "119.55", "latitude": "23.55", "waterLevel": "160" },
      { "id": "127", "province": "台湾省", "port": "基隆", "longitude": "121.75", "latitude": "25.15", "waterLevel": "60" },
      { "id": "128", "province": "台湾省", "port": "高雄", "longitude": "120.32", "latitude": "22.56", "waterLevel": "60" },
      { "id": "170", "province": "台湾省", "port": "下港", "longitude": "110.45", "latitude": "20.66", "waterLevel": "120" },
      { "id": "173", "province": "台湾省", "port": "乌石", "longitude": "109.78", "latitude": "20.62", "waterLevel": "190" }
    ],
    list010: ["南澳岛", "潮州港", "汕头", "海门", "甲子", "汕尾", "马鞭港", "惠州港", "大亚湾", "大鹏湾", "蛇口", "桂山岛", "内伶仃岛", "舢板洲", "深圳机场", "南沙（水牛头）", "海沁", "黄埔", "广州", "北街", "横门", "珠海（香洲）", "珠海（九州港）", "东澳岛", "大万山", "灯笼山", "三灶岛", "珠海港", "横山", "井岸（白蕉）", "上川岛", "北津", "海陵山岛", "电白", "博贺", "西葛", "茂石化", "硇洲岛", "湛江", "海安", "流沙", "下泊", "东沙岛"],
    list10: [
      { "id": "129", "province": "广东省", "port": "南澳岛", "longitude": "117.1", "latitude": "23.4", "waterLevel": "145" },
      { "id": "130", "province": "广东省", "port": "潮州港", "longitude": "116.97", "latitude": "23.59", "waterLevel": "178" },
      { "id": "131", "province": "广东省", "port": "汕头", "longitude": "116.73", "latitude": "23.35", "waterLevel": "137" },
      { "id": "132", "province": "广东省", "port": "海门", "longitude": "116.62", "latitude": "23.18", "waterLevel": "111" },
      { "id": "133", "province": "广东省", "port": "甲子", "longitude": "116.1", "latitude": "22.81", "waterLevel": "90" },
      { "id": "134", "province": "广东省", "port": "汕尾", "longitude": "115.37", "latitude": "22.76", "waterLevel": "100" },
      { "id": "135", "province": "广东省", "port": "马鞭港", "longitude": "114.65", "latitude": "22.66", "waterLevel": "116" },
      { "id": "136", "province": "广东省", "port": "惠州港", "longitude": "114.53", "latitude": "22.69", "waterLevel": "135" },
      { "id": "137", "province": "广东省", "port": "大亚湾", "longitude": "114.53", "latitude": "22.59", "waterLevel": "120" },
      { "id": "138", "province": "广东省", "port": "大鹏湾", "longitude": "114.27", "latitude": "22.58", "waterLevel": "116" },
      { "id": "140", "province": "广东省", "port": "蛇口", "longitude": "113.89", "latitude": "22.46", "waterLevel": "152" },
      { "id": "141", "province": "广东省", "port": "桂山岛", "longitude": "113.82", "latitude": "22.13", "waterLevel": "140" },
      { "id": "142", "province": "广东省", "port": "内伶仃岛", "longitude": "113.8", "latitude": "22.41", "waterLevel": "170" },
      { "id": "143", "province": "广东省", "port": "舢板洲", "longitude": "113.67", "latitude": "22.7", "waterLevel": "190" },
      { "id": "144", "province": "广东省", "port": "深圳机场", "longitude": "113.8", "latitude": "22.63", "waterLevel": "170" },
      { "id": "145", "province": "广东省", "port": "南沙（水牛头）", "longitude": "113.57", "latitude": "22.75", "waterLevel": "140" },
      { "id": "146", "province": "广东省", "port": "海沁", "longitude": "113.53", "latitude": "22.96", "waterLevel": "176" },
      { "id": "147", "province": "广东省", "port": "黄埔", "longitude": "113.47", "latitude": "23.1", "waterLevel": "155" },
      { "id": "148", "province": "广东省", "port": "广州", "longitude": "113.29", "latitude": "23.14", "waterLevel": "134" },
      { "id": "149", "province": "广东省", "port": "北街", "longitude": "113.12", "latitude": "22.59", "waterLevel": "60" },
      { "id": "150", "province": "广东省", "port": "横门", "longitude": "113.53", "latitude": "22.61", "waterLevel": "123" },
      { "id": "151", "province": "广东省", "port": "珠海（香洲）", "longitude": "113.58", "latitude": "22.28", "waterLevel": "150" },
      { "id": "152", "province": "广东省", "port": "珠海（九州港）", "longitude": "113.58", "latitude": "22.25", "waterLevel": "139" },
      { "id": "154", "province": "广东省", "port": "东澳岛", "longitude": "113.7", "latitude": "22.01", "waterLevel": "130" },
      { "id": "155", "province": "广东省", "port": "大万山", "longitude": "113.72", "latitude": "21.93", "waterLevel": "126" },
      { "id": "156", "province": "广东省", "port": "灯笼山", "longitude": "113.4", "latitude": "22.23", "waterLevel": "119" },
      { "id": "157", "province": "广东省", "port": "三灶岛", "longitude": "113.4", "latitude": "22.03", "waterLevel": "140" },
      { "id": "158", "province": "广东省", "port": "珠海港", "longitude": "113.23", "latitude": "21.92", "waterLevel": "148" },
      { "id": "159", "province": "广东省", "port": "横山", "longitude": "113.17", "latitude": "22.32", "waterLevel": "95" },
      { "id": "160", "province": "广东省", "port": "井岸（白蕉）", "longitude": "113.3", "latitude": "22.21", "waterLevel": "107" },
      { "id": "161", "province": "广东省", "port": "上川岛", "longitude": "112.77", "latitude": "21.75", "waterLevel": "158" },
      { "id": "162", "province": "广东省", "port": "北津", "longitude": "112.02", "latitude": "21.79", "waterLevel": "150" },
      { "id": "163", "province": "广东省", "port": "海陵山岛", "longitude": "111.82", "latitude": "21.58", "waterLevel": "170" },
      { "id": "164", "province": "广东省", "port": "电白", "longitude": "111.27", "latitude": "21.49", "waterLevel": "174" },
      { "id": "165", "province": "广东省", "port": "博贺", "longitude": "111.24", "latitude": "21.48", "waterLevel": "170" },
      { "id": "166", "province": "广东省", "port": "西葛", "longitude": "111.1", "latitude": "21.46", "waterLevel": "180" },
      { "id": "167", "province": "广东省", "port": "茂石化", "longitude": "111.07", "latitude": "21.47", "waterLevel": "197" },
      { "id": "168", "province": "广东省", "port": "硇洲岛", "longitude": "110.55", "latitude": "20.88", "waterLevel": "190" },
      { "id": "169", "province": "广东省", "port": "湛江", "longitude": "110.4", "latitude": "21.16", "waterLevel": "220" },
      { "id": "171", "province": "广东省", "port": "海安", "longitude": "110.09", "latitude": "20.13", "waterLevel": "170" },
      { "id": "172", "province": "广东省", "port": "流沙", "longitude": "110", "latitude": "20.45", "waterLevel": "200" },
      { "id": "174", "province": "广东省", "port": "下泊", "longitude": "109.77", "latitude": "21.26", "waterLevel": "280" },
      { "id": "175", "province": "广东省", "port": "东沙岛", "longitude": "116.71", "latitude": "20.62", "waterLevel": "70" }
    ],
    list011: ["香港"],
    list11: [
      { "id": "139", "province": "香港", "port": "香港", "longitude": "114.19", "latitude": "22.28", "waterLevel": "138" }
    ],
    list012: ["澳门"],
    list12: [
      { "id": "153", "province": "澳门", "port": "澳门", "longitude": "113.54", "latitude": "22.15", "waterLevel": "202" }
    ],
    list013: ["海口（秀英）", "铺前", "清澜", "博鳌", "新村", "牙笼港", "三亚", "莺歌海", "东方（八所）", "洋浦", "新盈", "马村港", "双子礁", "永暑礁"],
    list13: [
      { "id": "176", "province": "海南省", "port": "海口（秀英）", "longitude": "110.27", "latitude": "20", "waterLevel": "150" },
      { "id": "177", "province": "海南省", "port": "铺前", "longitude": "110.57", "latitude": "20.02", "waterLevel": "130" },
      { "id": "178", "province": "海南省", "port": "清澜", "longitude": "110.82", "latitude": "19.56", "waterLevel": "95" },
      { "id": "179", "province": "海南省", "port": "博鳌", "longitude": "110.6", "latitude": "19.2", "waterLevel": "90" },
      { "id": "180", "province": "海南省", "port": "新村", "longitude": "109.96", "latitude": "18.41", "waterLevel": "90" },
      { "id": "181", "province": "海南省", "port": "牙笼港", "longitude": "109.7", "latitude": "18.22", "waterLevel": "90" },
      { "id": "182", "province": "海南省", "port": "三亚", "longitude": "109.5", "latitude": "18.23", "waterLevel": "90" },
      { "id": "183", "province": "海南省", "port": "莺歌海", "longitude": "108.72", "latitude": "18.49", "waterLevel": "74" },
      { "id": "184", "province": "海南省", "port": "东方（八所）", "longitude": "108.61", "latitude": "19.08", "waterLevel": "145" },
      { "id": "185", "province": "海南省", "port": "洋浦", "longitude": "109.18", "latitude": "19.73", "waterLevel": "195" },
      { "id": "186", "province": "海南省", "port": "新盈", "longitude": "109.52", "latitude": "19.89", "waterLevel": "205" },
      { "id": "187", "province": "海南省", "port": "马村港", "longitude": "110.03", "latitude": "19.95", "waterLevel": "174" },
      { "id": "188", "province": "海南省", "port": "永兴岛", "longitude": "112.34", "latitude": "16.8", "waterLevel": "95" },
      { "id": "189", "province": "海南省", "port": "双子礁", "longitude": "114.29", "latitude": "11.35", "waterLevel": "107" },
      { "id": "190", "province": "海南省", "port": "永暑礁", "longitude": "112.87", "latitude": "9.46", "waterLevel": "130" }
    ],
    list014: ["铁山港", "涠洲岛", "北海", "龙门", "企沙", "炮台角", "防城港", "珍珠港"],
    list14: [
      { "id": "191", "province": "广西省", "port": "铁山港", "longitude": "109.56", "latitude": "21.57", "waterLevel": "359" },
      { "id": "192", "province": "广西省", "port": "涠洲岛", "longitude": "109.12", "latitude": "21", "waterLevel": "240" },
      { "id": "193", "province": "广西省", "port": "北海", "longitude": "109.08", "latitude": "21.48", "waterLevel": "255" },
      { "id": "194", "province": "广西省", "port": "龙门", "longitude": "108.55", "latitude": "21.75", "waterLevel": "250" },
      { "id": "195", "province": "广西省", "port": "企沙", "longitude": "108.48", "latitude": "21.58", "waterLevel": "230" },
      { "id": "196", "province": "广西省", "port": "炮台角", "longitude": "108.39", "latitude": "21.56", "waterLevel": "230" },
      { "id": "197", "province": "广西省", "port": "防城港", "longitude": "108.33", "latitude": "21.6", "waterLevel": "230" },
      { "id": "198", "province": "广西省", "port": "珍珠港", "longitude": "108.22", "latitude": "21.51", "waterLevel": "230" }
    ],
    list015: ["中沙群岛"],
    list15: [
      { "id": "485", "province": "三沙市", "port": "中沙群岛", "longitude": "117.77", "latitude": "15.15", "waterLevel": "90" }
    ],
    list016: ["白龙尾", "钓鱼岛"],
    list16: [
      { "id": "199", "province": "其他", "port": "白龙尾", "longitude": "108.22", "latitude": "21.5", "waterLevel": "282" },
      { "id": "484", "province": "其他", "port": "钓鱼岛", "longitude": "123.47", "latitude": "25.74", "waterLevel": "105" }
    ],

  },
// 选择时间
  bindTimeChange: function (e) {
    var that = this;
    that.setData({
      time_index: e.detail.value,
      time_now:e.detail.value
    })
    if (that.data.portId&&that.data.portId!=='') {
      var portId = that.data.portId
    } else {
      var portId = 24
    }
    that.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    });
    var windowW = that.data.imageWidth / 375;
    wx.request({
      url: adUrl + '/extraItem/tideData',
      data: {
        cityCode: portId,
        dateTime: e.detail.value,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.state == 1) {
          wx.showToast({
            title: res.data.message,
            image: './images/error.png',
            duration: 2000
          })
        }else{
          if (res.data.data.tidalTimeList.length > 0 || res.data.data.tidalHeightList.length > 0 || res.data.data.tiemTideList.length > 0 || res.data.data.tiemDateList.length > 0 || res.data.data.tiemHeightTideList.length > 0){
            lineChart = new wxCharts({
              canvasId: 'lineCanvas',
              type: 'line',
              categories: res.data.data.tiemTideList,
              animation: true,
              series: [{
                name: '潮高',
                data: res.data.data.tiemHeightTideList,
                format: function (val, name) {
                  return val + '厘米';
                }
              }],
              xAxis: {
                disableGrid: true
              },
              yAxis: {
                title: '潮高 (厘米)',
                format: function (val) {
                  return val.toFixed(2);
                },
                min: 0
              },
              width: (375 * windowW),
              height: 200,
              dataLabel: false,
              dataPointShape: true,
              extra: {
                lineStyle: 'curve'
              },
            })
          }else{
            wx.showToast({
              image: './images/error.png',
              title: '暂时无有效数据',
              duration: 3000,
            })
          }
        }
      if (res.data.data.tidalHeightList.length == 4) {
          if (Math.round(res.data.data.tidalHeightList[0]) > Math.round(res.data.data.tidalHeightList[1])) {
            that.setData({
              tiemHeightTideList: res.data.data.tiemHeightTideList,
              tiemTideList: res.data.data.tiemTideList,
              tidalHeightList: res.data.data.tidalHeightList,
              tidalTimeList: res.data.data.tidalTimeList,
              tableName: ['满潮', '干潮', '满潮', '干潮'],
              tableColor: ['#e70014', '#34ab35']
            })
          } else {
            that.setData({
              tiemHeightTideList: res.data.data.tiemHeightTideList,
              tiemTideList: res.data.data.tiemTideList,
              tidalHeightList: res.data.data.tidalHeightList,
              tidalTimeList: res.data.data.tidalTimeList,
              tableName: ['干潮', '满潮', '干潮', '满潮'],
              tableColor: ['#34ab35', '#e70014']
            })
          }
        } else if (res.data.data.tidalHeightList.length == 3) {
          that.setData({
            tiemHeightTideList: res.data.data.tiemHeightTideList,
            tiemTideList: res.data.data.tiemTideList,
            tidalHeightList: res.data.data.tidalHeightList,
            tidalTimeList: res.data.data.tidalTimeList,
            tableName: ['满潮', '干潮', '满潮'],
            tableColor: ['#e70014', '#34ab35',]
          })
        } else if (res.data.data.tidalHeightList.length == 2) {
          that.setData({
            tiemHeightTideList: res.data.data.tiemHeightTideList,
            tiemTideList: res.data.data.tiemTideList,
            tidalHeightList: res.data.data.tidalHeightList,
            tidalTimeList: res.data.data.tidalTimeList,
            tableName: ['满潮', '干潮'],
            tableColor: ['#e70014', '#34ab35']
          })
        }
      }
    });
    // 农历
    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = "甲乙丙丁戊己庚辛壬癸";
    var dzString = "子丑寅卯辰巳午未申酉戌亥";
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";
    var weekString = "日一二三四五六";
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
      return (m >> n) & 1;
    }
    function e2c() {
      TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      var total, m, n, k;
      var isEnd = false;
      var tmp = TheDate.getYear();
      if (tmp < 1900) {
        tmp += 1900;
      }
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

      if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
            isEnd = true; break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    }

    function GetcDateString(){
      var tmp = "";
      tmp += tgString.charAt((cYear - 4) % 10);
      tmp += dzString.charAt((cYear - 4) % 12);
      tmp += "(";
      tmp += sx.charAt((cYear - 4) % 12);
      tmp += ")年 ";
      if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += "月";
      tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
      if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) {
      //solarYear = solarYear<1900?(1900+solarYear):solarYear;
      if (solarYear < 1921 || solarYear > 2020) {
        return "";
      } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
      }
    }
    var myDate = new Date();
    var y = myDate.getFullYear();
    var m = myDate.getMonth() + 1;
    var d = myDate.getDate();
    var nowdata = y + '-' + (m < 10 ? "0" + m : m) + '-' + (d < 10 ? "0" + d : d);
    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    var yy = that.data.time_index.substr(0, 4);
    var mm = that.data.time_index.substr(5, 2);
    var dd = that.data.time_index.substr(8, 2);
    var showCal = (GetLunarDay(yy, mm, dd));
    var dataLunarCalendar = showCal.substr(6, 5);
    var h = myDate.getHours();
    var ss = myDate.getMinutes();
    if (ss < 10) {
      var s = '0' + ss;
    } else {
      var s = ss;
    }
    if (that.data.time_index == that.data.time_db) {
      var dateTime = that.data.time_index + '  ' + h + ':' + s;
    } else {
      var dateTime = that.data.time_index
    }
    var day = new Date(that.data.time_index).getDay();
    var week = show_day[day];
    if (that.data.port_index=='港口'){
      var port='塘沽'
    }else{
      var port=that.data.port_index
    }
    that.setData({
      dataLunarCalendar: dataLunarCalendar,
      port: port,
      week: week,
      dateTime: dateTime
    })
    // 天气
    if (that.data.longitude && that.data.longitude !== ''){
      var jd = that.data.longitude;
      var wd = that.data.latitude;
    }else{
      var jd ='117.79';
      var wd ='38.97'
    }
    wx.request({
      url: weatherUrl + '/s6/weather/forecast?location=' + jd + ',' + wd + '&key=efe4cbf7935147b4b637d196e01d8f73',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var weatherTime1 = res.data.HeWeather6[0].daily_forecast[0].date.replace(/-/g, "月").substr(5, 5) + '日';
        var weatherTime2 = res.data.HeWeather6[0].daily_forecast[1].date.replace(/-/g, "月").substr(5, 5) + '日';
        var weatherTime3 = res.data.HeWeather6[0].daily_forecast[2].date.replace(/-/g, "月").substr(5, 5) + '日';
        that.setData({
          daily_forecast: res.data.HeWeather6[0].daily_forecast,
          weatherTime1: weatherTime1,
          weatherTime2: weatherTime2,
          weatherTime3: weatherTime3
        })
        console.log(weatherTime1, weatherTime2, weatherTime3)
      }
    })
  },
// 选择省份
  bindProvinceChange:function(e){
    var that=this;
    that.setData({
      province_index: that.data.city1[e.detail.value],
      listIndex:e.detail.value
    })
    if (e.detail.value==0){
     that.setData({
       portArray:that.data.list001,
       listArray:that.data.list01
     })
    } else if (e.detail.value == 1){
      that.setData({
        portArray: that.data.list002,
        listArray: that.data.list02
      })
    } else if (e.detail.value == 2) {
      that.setData({
        portArray: that.data.list003,
        listArray: that.data.list03
      })
    } else if (e.detail.value == 3) {
      that.setData({
        portArray: that.data.list004,
        listArray: that.data.list04
      })
    } else if (e.detail.value == 4) {
      that.setData({
        portArray: that.data.list005,
        listArray: that.data.list05
      })
    } else if (e.detail.value == 5) {
      that.setData({
        portArray: that.data.list006,
        listArray: that.data.list06
      })
    } else if (e.detail.value == 6) {
      that.setData({
        portArray: that.data.list007,
        listArray: that.data.list07
      })
    } else if (e.detail.value == 7) {
      that.setData({
        portArray: that.data.list008,
        listArray: that.data.list08
      })
    } else if (e.detail.value == 8) {
      that.setData({
        portArray: that.data.list009,
        listArray: that.data.list09
      })
    } else if (e.detail.value == 9) {
      that.setData({
        portArray: that.data.list010,
        listArray: that.data.list10
      })
    } else if (e.detail.value == 10) {
      that.setData({
        portArray: that.data.list011,
        listArray: that.data.list11
      })
    } else if (e.detail.value == 11) {
      that.setData({
        portArray: that.data.list012,
        listArray: that.data.list12
      })
    } else if (e.detail.value == 12) {
      that.setData({
        portArray: that.data.list013,
        listArray: that.data.list13
      })
    } else if (e.detail.value == 13) {
      that.setData({
        portArray: that.data.list014,
        listArray: that.data.list14
      })
    } else if (e.detail.value == 14) {
      that.setData({
        portArray: that.data.list015,
        listArray: that.data.list15
      })
    } else if (e.detail.value == 15) {
      that.setData({
        portArray: that.data.list016,
        listArray: that.data.list16
      })
    }

  },
// 选择港口
  bindPortChange:function(e){
    var that = this;
    var windowW = that.data.imageWidth / 375;
    that.setData({
      province:that.data.province_index,
      port_index: that.data.portArray[e.detail.value],
      port: that.data.portArray[e.detail.value],
      portId: that.data.listArray[e.detail.value].id,
      waterLevel: that.data.listArray[e.detail.value].waterLevel,
      longitude: that.data.listArray[e.detail.value].longitude,
      latitude: that.data.listArray[e.detail.value].latitude,
    })
    // 折线图
    wx.request({
      url: adUrl + '/extraItem/tideData',
      data: {
        cityCode: that.data.listArray[e.detail.value].id ,
        dateTime: that.data.time_index,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.state == 1) {
          wx.showToast({
            title: res.data.message,
            image: './images/error.png',
            duration: 2000
          })
        } else {
          if (res.data.data.tidalTimeList.length > 0 || res.data.data.tidalHeightList.length > 0 || res.data.data.tiemTideList.length > 0 || res.data.data.tiemDateList.length > 0 || res.data.data.tiemHeightTideList.length > 0) {
            lineChart = new wxCharts({
              canvasId: 'lineCanvas',
              type: 'line',
              categories: res.data.data.tiemTideList,
              animation: true,
              series: [{
                name: '潮高',
                data: res.data.data.tiemHeightTideList,
                format: function (val, name) {
                  return val + '厘米';
                }
              }],
              xAxis: {
                disableGrid: true
              },
              yAxis: {
                title: '潮高 (厘米)',
                format: function (val) {
                  return val.toFixed(2);
                },
                min: 0
              },
              width: (375 * windowW),
              height: 200,
              dataLabel: false,
              dataPointShape: true,
              extra: {
                lineStyle: 'curve'
              },
            })
          } else {
            wx.showToast({
              image: './images/error.png',
              title: '暂时无有效数据',
              duration: 3000
            })
          }
        }
        if (res.data.data.tidalHeightList.length==4){
          if (Math.round(res.data.data.tidalHeightList[0]) > Math.round(res.data.data.tidalHeightList[1])) {
              console.log(1)
               that.setData({
                 tiemHeightTideList: res.data.data.tiemHeightTideList,
                 tiemTideList: res.data.data.tiemTideList,
                 tidalHeightList: res.data.data.tidalHeightList,
                 tidalTimeList: res.data.data.tidalTimeList,
                 tableName: ['满潮', '干潮', '满潮', '干潮'],
                 tableColor: ['#e70014', '#34ab35']
                })
            } else{
              console.log(2)
               that.setData({
                 tiemHeightTideList: res.data.data.tiemHeightTideList,
                 tiemTideList: res.data.data.tiemTideList,
                 tidalHeightList: res.data.data.tidalHeightList,
                 tidalTimeList: res.data.data.tidalTimeList,
                 tableName: ['干潮', '满潮', '干潮', '满潮'],
                 tableColor: ['#34ab35', '#e70014']
               })
            }
        } else if (res.data.data.tidalHeightList.length == 3){
                that.setData({
                  tiemHeightTideList: res.data.data.tiemHeightTideList,
                  tiemTideList: res.data.data.tiemTideList,
                  tidalHeightList: res.data.data.tidalHeightList,
                  tidalTimeList: res.data.data.tidalTimeList,
                  tableName: ['满潮', '干潮', '满潮'],
                  tableColor: ['#e70014', '#34ab35',]
          })
        } else if (res.data.data.tidalHeightList.length == 2) {
            that.setData({
              tiemHeightTideList: res.data.data.tiemHeightTideList,
              tiemTideList: res.data.data.tiemTideList,
              tidalHeightList: res.data.data.tidalHeightList,
              tidalTimeList: res.data.data.tidalTimeList,
              tableName: ['满潮', '干潮'],
              tableColor: ['#e70014','#34ab35']
            })
        }
      }
    });
    // 农历
    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = "甲乙丙丁戊己庚辛壬癸";
    var dzString = "子丑寅卯辰巳午未申酉戌亥";
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";
    var weekString = "日一二三四五六";
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
      return (m >> n) & 1;
    }
    function e2c() {
      TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      var total, m, n, k;
      var isEnd = false;
      var tmp = TheDate.getYear();
      if (tmp < 1900) {
        tmp += 1900;
      }
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

      if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
            isEnd = true; break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    }

    function GetcDateString() {
      var tmp = "";
      tmp += tgString.charAt((cYear - 4) % 10);
      tmp += dzString.charAt((cYear - 4) % 12);
      tmp += "(";
      tmp += sx.charAt((cYear - 4) % 12);
      tmp += ")年 ";
      if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += "月";
      tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
      if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) {
      //solarYear = solarYear<1900?(1900+solarYear):solarYear;
      if (solarYear < 1921 || solarYear > 2020) {
        return "";
      } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
      }
    }
    var myDate = new Date();
    var y = myDate.getFullYear();
    var m = myDate.getMonth() + 1;
    var d = myDate.getDate();
    var nowdata = y + '-' + (m < 10 ? "0" + m : m) + '-' + (d < 10 ? "0" + d : d);
    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'); 
    var yy = that.data.time_index.substr(0,4);
    var mm = that.data.time_index.substr(5, 2);
    var dd = that.data.time_index.substr(8, 2);
    var showCal = (GetLunarDay(yy, mm, dd));
    var dataLunarCalendar = showCal.substr(6, 5);
    var h = myDate.getHours();
    var ss = myDate.getMinutes();
    if (ss < 10) {
      var s = '0' + ss;
    } else {
      var s = ss;
    }
    if (that.data.time_index == that.data.time_db){
      var dateTime = that.data.time_index + '  ' + h + ':' + s;
    }else{
      var dateTime = that.data.time_index
    }
    var day = new Date(that.data.time_index).getDay();
    var week = show_day[day];
    that.setData({
      dataLunarCalendar: dataLunarCalendar,
      port: that.data.port_index,
      week:week,
      dateTime:dateTime
    })
    // 天气
    var jd = that.data.longitude;
    var wd=  that.data.latitude;
    wx.request({
      url: weatherUrl + '/s6/weather/forecast?location='+jd+','+wd+'&key=efe4cbf7935147b4b637d196e01d8f73',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var weatherTime1 = res.data.HeWeather6[0].daily_forecast[0].date.replace(/-/g, "月").substr(5, 5) + '日';
        var weatherTime2 = res.data.HeWeather6[0].daily_forecast[1].date.replace(/-/g, "月").substr(5, 5) + '日';
        var weatherTime3 = res.data.HeWeather6[0].daily_forecast[2].date.replace(/-/g, "月").substr(5, 5) + '日';
        that.setData({
          daily_forecast: res.data.HeWeather6[0].daily_forecast,
          weatherTime1: weatherTime1,
          weatherTime2: weatherTime2,
          weatherTime3: weatherTime3
        })
        console.log(weatherTime1, weatherTime2, weatherTime3)
      }
    })

  },
  // 触摸显示
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

  onLoad: function (e){
   var that=this;
    // 屏幕宽度
    that.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    });
    //计算屏幕宽度比列
    var windowW = that.data.imageWidth / 375;
    //今天日期 
    var myDate = new Date();
    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'); 
    var y = myDate.getFullYear();
    var m = myDate.getMonth() + 1;
    var d = myDate.getDate();
    var nowdata = y + '-' + (m < 10 ? "0" + m : m) + '-' + (d < 10 ? "0" + d : d);
    var h = myDate.getHours();
    var ss = myDate.getMinutes();
    if (ss<10){
      var s ='0'+ ss;
    }else{
      var s =ss;
    }
    var dateTime=nowdata+'  '+h+':'+s;
    var day = myDate.getDay();
    var week=show_day[day];
    that.getLunarCalendar();
    console.log(dateTime, week,ss)
    that.setData({
      time_index:nowdata,
      time_db:nowdata,
      dateTime: dateTime,
      week:week,
    })
    wx.request({
      url: adUrl + '/extraItem/tideData',
      data: {
        cityCode: 24,
        dateTime: nowdata ,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.state == 1) {
          wx.showToast({
            title: res.data.message,
            image: './images/error.png',
            duration: 2000
          })
        } else {
          if (res.data.data.tidalTimeList.length > 0 || res.data.data.tidalHeightList.length > 0 || res.data.data.tiemTideList.length > 0 || res.data.data.tiemDateList.length > 0 || res.data.data.tiemHeightTideList.length > 0) {
            lineChart = new wxCharts({
              canvasId: 'lineCanvas',
              type: 'line',
              categories: res.data.data.tiemTideList,
              animation: true,
              series: [{
                name: '潮高',
                data: res.data.data.tiemHeightTideList,
                format: function (val, name) {
                  return val + '厘米';
                }
              }],
              xAxis: {
                disableGrid: true
              },
              yAxis: {
                title: '潮高 (厘米)',
                format: function (val) {
                  return val.toFixed(2);
                },
                min: 0
              },
              width: (375 * windowW),
              height: 200,
              dataLabel: false,
              dataPointShape: true,
              extra: {
                lineStyle: 'curve'
              },
            })
          } else {
            wx.showToast({
              image: './images/error.png',
              title: '暂时无有效数据',
              duration: 3000
            })
          }
        }
        if (res.data.data.tidalHeightList.length == 4) {
          if (Math.round(res.data.data.tidalHeightList[0]) > Math.round(res.data.data.tidalHeightList[1])) {
            that.setData({
              tiemHeightTideList: res.data.data.tiemHeightTideList,
              tiemTideList: res.data.data.tiemTideList,
              tidalHeightList: res.data.data.tidalHeightList,
              tidalTimeList: res.data.data.tidalTimeList,
              tableName: ['满潮', '干潮', '满潮', '干潮'],
              tableColor: ['#e70014', '#34ab35']
            })
          } else {
            that.setData({
              tiemHeightTideList: res.data.data.tiemHeightTideList,
              tiemTideList: res.data.data.tiemTideList,
              tidalHeightList: res.data.data.tidalHeightList,
              tidalTimeList: res.data.data.tidalTimeList,
              tableName: ['干潮', '满潮', '干潮', '满潮'],
              tableColor: ['#34ab35', '#e70014']
            })
          }
        } else if (res.data.data.tidalHeightList.length == 3) {
          that.setData({
            tiemHeightTideList: res.data.data.tiemHeightTideList,
            tiemTideList: res.data.data.tiemTideList,
            tidalHeightList: res.data.data.tidalHeightList,
            tidalTimeList: res.data.data.tidalTimeList,
            tableName: ['满潮', '干潮', '满潮'],
            tableColor: ['#e70014', '#34ab35',]
          })
        } else if (res.data.data.tidalHeightList.length == 2) {
          that.setData({
            tiemHeightTideList: res.data.data.tiemHeightTideList,
            tiemTideList: res.data.data.tiemTideList,
            tidalHeightList: res.data.data.tidalHeightList,
            tidalTimeList: res.data.data.tidalTimeList,
            tableName: ['满潮', '干潮'],
            tableColor: ['#e70014', '#34ab35']
          })
        }
      }
    })
    // https://free-api.heweather.net/s6/weather/forecast?location=120.47,40.22&key=efe4cbf7935147b4b637d196e01d8f73
    wx.request({
      url: weatherUrl + '/s6/weather/forecast?location=117.79,38.97&key=efe4cbf7935147b4b637d196e01d8f73',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var weatherTime1 = res.data.HeWeather6[0].daily_forecast[0].date.replace(/-/g, "月").substr(5,5)+'日';
        var weatherTime2 = res.data.HeWeather6[0].daily_forecast[1].date.replace(/-/g, "月").substr(5, 5) + '日';
        var weatherTime3 = res.data.HeWeather6[0].daily_forecast[2].date.replace(/-/g, "月").substr(5, 5) + '日';
        that.setData({
          daily_forecast: res.data.HeWeather6[0].daily_forecast,
          weatherTime1: weatherTime1,
          weatherTime2: weatherTime2,
          weatherTime3: weatherTime3
        })
        console.log(weatherTime1, weatherTime2,weatherTime3)
      }
    })
  },
// 收藏
  collection:function(){
    var that=this;
    that.setData({
      show:!that.data.show
    })
  },
  bindScang:function(){
    console.log(1)
    wx.showToast({
      title: '该功能近期开放',
      image: './images/sorry.png',
      duration: 2000
    })
  },
  getLunarCalendar: function () {
    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = "甲乙丙丁戊己庚辛壬癸";
    var dzString = "子丑寅卯辰巳午未申酉戌亥";
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";
    var weekString = "日一二三四五六";
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
      return (m >> n) & 1;
    }
    function e2c() {
      TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
      var total, m, n, k;
      var isEnd = false;
      var tmp = TheDate.getYear();
      if (tmp < 1900) {
        tmp += 1900;
      }
      total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

      if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
      }
      for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
          if (total <= 29 + GetBit(CalendarData[m], n)) {
            isEnd = true; break;
          }
          total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
      }
      cYear = 1921 + m;
      cMonth = k - n + 1;
      cDay = total;
      if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
          cMonth--;
        }
      }
    }

    function GetcDateString() {
      var tmp = "";
      tmp += tgString.charAt((cYear - 4) % 10);
      tmp += dzString.charAt((cYear - 4) % 12);
      tmp += "(";
      tmp += sx.charAt((cYear - 4) % 12);
      tmp += ")年 ";
      if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
      } else {
        tmp += monString.charAt(cMonth - 1);
      }
      tmp += "月";
      tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
      if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
      }
      return tmp;
    }

    function GetLunarDay(solarYear, solarMonth, solarDay) {
      //solarYear = solarYear<1900?(1900+solarYear):solarYear;
      if (solarYear < 1921 || solarYear > 2020) {
        return "";
      } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
      }
    }
    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    var ww = D.getDay();
    var ss = parseInt(D.getTime() / 1000);
    if (yy < 100) yy = "19" + yy;
    // function showCal() {
    //   return (GetLunarDay(yy, mm, dd));
    // }
    var showCal = (GetLunarDay(yy, mm, dd));
    var dataLunarCalendar=showCal.substr(6,5)
    this.setData({
      dataLunarCalendar: dataLunarCalendar
    })
    console.log(dataLunarCalendar)
  },
  /////////////
  onShow: function (e) {
    var that = this;
    // 屏幕宽度
    that.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    });
    //计算屏幕宽度比列
    var windowW = that.data.imageWidth / 375;
 
    // 下面注释的都是不要的
    /////////////////////////
    //今天日期 
    // var myDate = new Date();
    // var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    // var y = myDate.getFullYear();
    // var m = myDate.getMonth() + 1;
    // var d = myDate.getDate();
    // var nowdata = y + '-' + (m < 10 ? "0" + m : m) + '-' + (d < 10 ? "0" + d : d);
    // var h = myDate.getHours();
    // var ss = myDate.getMinutes();
    // if (ss < 10) {
    //   var s = '0' + ss;
    // } else {
    //   var s = ss;
    // }
    // var dateTime = nowdata + '  ' + h + ':' + s;
    // var day = myDate.getDay();
    // var week = show_day[day];
    // that.getLunarCalendar();
    // console.log(dateTime, week, ss)
    // that.setData({
    //   time_index: nowdata,
    //   time_db: nowdata,
    //   dateTime: dateTime,
    //   week: week,
    // })
    //////////////
    if (that.data.portId && that.data.portId!==''){
      var portId = that.data.portId
    }else{
      var portId = 24
    }
    if (that.data.time_now && that.data.time_now!==''){
      var dateTime2=that.data.time_now
    }else{
      var dateTime2=that.data.time_index
    }
    wx.request({
      url: adUrl + '/extraItem/tideData',
      data: {
        cityCode: portId,
        dateTime: dateTime2,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.state == 1) {
          wx.showToast({
            title: res.data.message,
            image: './images/error.png',
            duration: 2000
          })
        } else {
          if (res.data.data.tidalTimeList.length > 0 || res.data.data.tidalHeightList.length > 0 || res.data.data.tiemTideList.length > 0 || res.data.data.tiemDateList.length > 0 || res.data.data.tiemHeightTideList.length > 0) {
            lineChart = new wxCharts({
              canvasId: 'lineCanvas',
              type: 'line',
              categories: res.data.data.tiemTideList,
              animation: true,
              series: [{
                name: '潮高',
                data: res.data.data.tiemHeightTideList,
                format: function (val, name) {
                  return val + '厘米';
                }
              }],
              xAxis: {
                disableGrid: true
              },
              yAxis: {
                title: '潮高 (厘米)',
                format: function (val) {
                  return val.toFixed(2);
                },
                min: 0
              },
              width: (375 * windowW),
              height: 200,
              dataLabel: false,
              dataPointShape: true,
              extra: {
                lineStyle: 'curve'
              },
            })
          } else {
            wx.showToast({
              image: './images/error.png',
              title: '暂时无有效数据',
              duration: 3000
            })
          }
        }
        if (res.data.data.tidalHeightList.length == 4) {
          if (Math.round(res.data.data.tidalHeightList[0]) > Math.round(res.data.data.tidalHeightList[1])) {
            that.setData({
              tiemHeightTideList: res.data.data.tiemHeightTideList,
              tiemTideList: res.data.data.tiemTideList,
              tidalHeightList: res.data.data.tidalHeightList,
              tidalTimeList: res.data.data.tidalTimeList,
              tableName: ['满潮', '干潮', '满潮', '干潮'],
              tableColor: ['#e70014', '#34ab35']
            })
          } else {
            that.setData({
              tiemHeightTideList: res.data.data.tiemHeightTideList,
              tiemTideList: res.data.data.tiemTideList,
              tidalHeightList: res.data.data.tidalHeightList,
              tidalTimeList: res.data.data.tidalTimeList,
              tableName: ['干潮', '满潮', '干潮', '满潮'],
              tableColor: ['#34ab35', '#e70014']
            })
          }
        } else if (res.data.data.tidalHeightList.length == 3) {
          that.setData({
            tiemHeightTideList: res.data.data.tiemHeightTideList,
            tiemTideList: res.data.data.tiemTideList,
            tidalHeightList: res.data.data.tidalHeightList,
            tidalTimeList: res.data.data.tidalTimeList,
            tableName: ['满潮', '干潮', '满潮'],
            tableColor: ['#e70014', '#34ab35',]
          })
        } else if (res.data.data.tidalHeightList.length == 2) {
          that.setData({
            tiemHeightTideList: res.data.data.tiemHeightTideList,
            tiemTideList: res.data.data.tiemTideList,
            tidalHeightList: res.data.data.tidalHeightList,
            tidalTimeList: res.data.data.tidalTimeList,
            tableName: ['满潮', '干潮'],
            tableColor: ['#e70014', '#34ab35']
          })
        }
      }
    })
    // https://free-api.heweather.net/s6/weather/forecast?location=120.47,40.22&key=efe4cbf7935147b4b637d196e01d8f73
    if (that.data.longitude && that.data.longitude!=='') {
      var jd = that.data.longitude;
      var wd = that.data.latitude;
    } else {
      var jd = '117.79';
      var wd = '38.97'
    }
    wx.request({
      url: weatherUrl + '/s6/weather/forecast?location=' + jd + ',' + wd + '&key=efe4cbf7935147b4b637d196e01d8f73',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var weatherTime1 = res.data.HeWeather6[0].daily_forecast[0].date.replace(/-/g, "月").substr(5, 5) + '日';
        var weatherTime2 = res.data.HeWeather6[0].daily_forecast[1].date.replace(/-/g, "月").substr(5, 5) + '日';
        var weatherTime3 = res.data.HeWeather6[0].daily_forecast[2].date.replace(/-/g, "月").substr(5, 5) + '日';
        that.setData({
          daily_forecast: res.data.HeWeather6[0].daily_forecast,
          weatherTime1: weatherTime1,
          weatherTime2: weatherTime2,
          weatherTime3: weatherTime3
        })
        console.log(weatherTime1, weatherTime2, weatherTime3)
      }
    })
  }
})