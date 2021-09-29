export const TaskPage = {
  template: `
        <div id="app">
            <el-row>
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%" border stripe v-loading='loading'>
                        <el-table-column type="index" label="序号" align="right" fixed></el-table-column>
                        <el-table-column prop="name" label="任务" sortable align="left"></el-table-column>
                        <el-table-column prop="type" label="类型" sortable align="right"></el-table-column>
                        <el-table-column prop="time" label="corn" sortable align="left"></el-table-column>
                        <el-table-column prop="running" label="运行" sortable align="right"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
`,
  data() {
    return {
      tableData: [],
      title: "任务列表",
      loading: false,
      isLogin: true,
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    fetch() {
      // console.log(this.title)
      this.loading = true;
      var that = this;
      axios.get("api/taskInfo").then((response) => {
        that.tableData = this.formatData(response.data.list);
        setTimeout(() => {
          that.loading = false;
        }, 100);
      });
    },
    init() {
      this.fetch();
    },
    formatData(data) {
      return data.map((x) => {
        x.running = x.running + "";
        return x;
      });
    },
  },
  watch: {
    title() {
      document.title = this.title;
    },
  },
};
