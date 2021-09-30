Vue.component('TaskPage', {
  template: '#task-page',
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
});

export const TaskPage = {
  template: '<TaskPage></TaskPage>'
}