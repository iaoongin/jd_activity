import { DualAxes } from "@ant-design/plots";
import React from "react";
import { getJdBeanBalance } from "../apis/jdBeanApi";

export default class BeanChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        theme: {
          background: "#ffffff",
          subColor: "rgba(0,0,0,0.05)",
          semanticRed: "#F4664A",
          semanticGreen: "#30BF78",
          padding: "auto",
          fontFamily:
            '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
          columnWidthRatio: 0.5,
          maxColumnWidth: null,
          minColumnWidth: null,
          roseWidthRatio: 0.9999999,
          multiplePieWidthRatio: 0.7692307692307692,
          sequenceColors: [
            "#ffe1d0",
            "#ffdecb",
            "#ffbd99",
            "#ff9d68",
            "#ff8d59",
            "#ff7d4a",
            "#ff6b3b",
            "#ec5b2c",
            "#d84a1d",
            "#c5390c",
          ],
          shapes: {
            point: [
              "hollow-circle",
              "hollow-square",
              "hollow-bowtie",
              "hollow-diamond",
              "hollow-hexagon",
              "hollow-triangle",
              "hollow-triangle-down",
              "circle",
              "square",
              "bowtie",
              "diamond",
              "hexagon",
              "triangle",
              "triangle-down",
              "cross",
              "tick",
              "plus",
              "hyphen",
              "line",
            ],
            line: ["line", "dash", "dot", "smooth"],
            area: ["area", "smooth", "line", "smooth-line"],
            interval: ["rect", "hollow-rect", "line", "tick"],
          },
          sizes: [1, 10],
          components: {
            axis: {
              common: {
                title: {
                  autoRotate: true,
                  position: "center",
                  spacing: 12,
                  style: {
                    fill: "#595959",
                    fontSize: 12,
                    lineHeight: 12,
                    textBaseline: "middle",
                    fontFamily:
                      '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                  },
                },
                label: {
                  autoRotate: false,
                  autoEllipsis: false,
                  autoHide: { type: "equidistance", cfg: { minGap: 6 } },
                  offset: 8,
                  style: {
                    fill: "#8C8C8C",
                    fontSize: 12,
                    lineHeight: 12,
                    fontFamily:
                      '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                  },
                },
                line: { style: { lineWidth: 1, stroke: "#BFBFBF" } },
                grid: {
                  line: {
                    type: "line",
                    style: { stroke: "#D9D9D9", lineWidth: 1, lineDash: null },
                  },
                  alignTick: true,
                  animate: true,
                },
                tickLine: {
                  style: { lineWidth: 1, stroke: "#BFBFBF" },
                  alignTick: true,
                  length: 4,
                },
                subTickLine: null,
                animate: true,
              },
              top: {
                position: "top",
                grid: null,
                title: null,
                verticalLimitLength: 0.5,
              },
              bottom: {
                position: "bottom",
                grid: null,
                title: null,
                verticalLimitLength: 0.5,
              },
              left: {
                position: "left",
                title: null,
                line: null,
                tickLine: null,
                verticalLimitLength: 0.3333333333333333,
              },
              right: {
                position: "right",
                title: null,
                line: null,
                tickLine: null,
                verticalLimitLength: 0.3333333333333333,
              },
              circle: {
                title: null,
                grid: {
                  line: {
                    type: "line",
                    style: { stroke: "#D9D9D9", lineWidth: 1, lineDash: null },
                  },
                  alignTick: true,
                  animate: true,
                },
              },
              radius: {
                title: null,
                grid: {
                  line: {
                    type: "circle",
                    style: { stroke: "#D9D9D9", lineWidth: 1, lineDash: null },
                  },
                  alignTick: true,
                  animate: true,
                },
              },
            },
            legend: {
              common: {
                title: null,
                marker: {
                  symbol: "circle",
                  spacing: 8,
                  style: { r: 4, fill: "#5B8FF9" },
                },
                itemName: {
                  spacing: 5,
                  style: {
                    fill: "#595959",
                    fontFamily:
                      '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                    fontSize: 12,
                    lineHeight: 12,
                    fontWeight: "normal",
                    textAlign: "start",
                    textBaseline: "middle",
                  },
                },
                itemStates: {
                  active: { nameStyle: { opacity: 0.8 } },
                  unchecked: {
                    nameStyle: { fill: "#D8D8D8" },
                    markerStyle: { fill: "#D8D8D8", stroke: "#D8D8D8" },
                  },
                  inactive: {
                    nameStyle: { fill: "#D8D8D8" },
                    markerStyle: { opacity: 0.2 },
                  },
                },
                flipPage: true,
                pageNavigator: {
                  marker: {
                    style: {
                      size: 12,
                      inactiveFill: "#000",
                      inactiveOpacity: 0.45,
                      fill: "#000",
                      opacity: 1,
                    },
                  },
                  text: { style: { fill: "#8C8C8C", fontSize: 12 } },
                },
                animate: false,
                maxItemWidth: 200,
                itemSpacing: 24,
                itemMarginBottom: 12,
                padding: [8, 8, 8, 8],
              },
              right: { layout: "vertical", padding: [0, 8, 0, 8] },
              left: { layout: "vertical", padding: [0, 8, 0, 8] },
              top: { layout: "horizontal", padding: [8, 0, 8, 0] },
              bottom: { layout: "horizontal", padding: [8, 0, 8, 0] },
              continuous: {
                title: null,
                background: null,
                track: {},
                rail: {
                  type: "color",
                  size: 12,
                  defaultLength: 100,
                  style: { fill: "#D9D9D9", stroke: null, lineWidth: 0 },
                },
                label: {
                  align: "rail",
                  spacing: 4,
                  formatter: null,
                  style: {
                    fill: "#8C8C8C",
                    fontSize: 12,
                    lineHeight: 12,
                    textBaseline: "middle",
                    fontFamily:
                      '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                  },
                },
                handler: {
                  size: 10,
                  style: { fill: "#F0F0F0", stroke: "#BFBFBF" },
                },
                slidable: true,
                padding: [8, 8, 8, 8],
              },
            },
            tooltip: {
              showContent: true,
              follow: true,
              showCrosshairs: false,
              showMarkers: true,
              shared: false,
              enterable: false,
              position: "auto",
              marker: {
                symbol: "circle",
                stroke: "#fff",
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: "rgba(0,0,0,0.09)",
                lineWidth: 2,
                r: 4,
              },
              crosshairs: {
                line: { style: { stroke: "#BFBFBF", lineWidth: 1 } },
                text: null,
                textBackground: {
                  padding: 2,
                  style: {
                    fill: "rgba(0, 0, 0, 0.25)",
                    lineWidth: 0,
                    stroke: null,
                  },
                },
                follow: false,
              },
              domStyles: {
                "g2-tooltip": {
                  position: "absolute",
                  visibility: "hidden",
                  zIndex: 8,
                  transition:
                    "left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s",
                  backgroundColor: "rgb(255, 255, 255)",
                  opacity: 0.95,
                  boxShadow: "0px 0px 10px #aeaeae",
                  borderRadius: "3px",
                  color: "#595959",
                  fontSize: "12px",
                  fontFamily:
                    '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                  lineHeight: "12px",
                  padding: "0 12px 0 12px",
                },
                "g2-tooltip-title": { marginBottom: "12px", marginTop: "12px" },
                "g2-tooltip-list": {
                  margin: 0,
                  listStyleType: "none",
                  padding: 0,
                },
                "g2-tooltip-list-item": {
                  listStyleType: "none",
                  padding: 0,
                  marginBottom: "12px",
                  marginTop: "12px",
                  marginLeft: 0,
                  marginRight: 0,
                },
                "g2-tooltip-marker": {
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                },
                "g2-tooltip-value": {
                  display: "inline-block",
                  float: "right",
                  marginLeft: "30px",
                },
              },
            },
            annotation: {
              arc: {
                style: { stroke: "#D9D9D9", lineWidth: 1 },
                animate: true,
              },
              line: {
                style: { stroke: "#BFBFBF", lineDash: null, lineWidth: 1 },
                text: {
                  position: "start",
                  autoRotate: true,
                  style: {
                    fill: "#595959",
                    stroke: null,
                    lineWidth: 0,
                    fontSize: 12,
                    textAlign: "start",
                    fontFamily:
                      '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                    textBaseline: "bottom",
                  },
                },
                animate: true,
              },
              text: {
                style: {
                  fill: "#595959",
                  stroke: null,
                  lineWidth: 0,
                  fontSize: 12,
                  textBaseline: "middle",
                  textAlign: "start",
                  fontFamily:
                    '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                },
                animate: true,
              },
              region: {
                top: false,
                style: {
                  lineWidth: 0,
                  stroke: null,
                  fill: "#000",
                  fillOpacity: 0.06,
                },
                animate: true,
              },
              image: { top: false, animate: true },
              dataMarker: {
                top: true,
                point: { style: { r: 3, stroke: "#5B8FF9", lineWidth: 2 } },
                line: {
                  style: { stroke: "#BFBFBF", lineWidth: 1 },
                  length: 16,
                },
                text: {
                  style: {
                    textAlign: "start",
                    fill: "#595959",
                    stroke: null,
                    lineWidth: 0,
                    fontSize: 12,
                    fontFamily:
                      '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                  },
                },
                direction: "upward",
                autoAdjust: true,
                animate: true,
              },
              dataRegion: {
                style: {
                  region: { fill: "#000", fillOpacity: 0.06 },
                  text: {
                    textAlign: "center",
                    textBaseline: "bottom",
                    fill: "#595959",
                    stroke: null,
                    lineWidth: 0,
                    fontSize: 12,
                    fontFamily:
                      '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
                  },
                },
                animate: true,
              },
            },
            slider: {
              common: {
                padding: [8, 8, 8, 8],
                backgroundStyle: { fill: "#416180", opacity: 0.05 },
                foregroundStyle: { fill: "#5B8FF9", opacity: 0.15 },
                handlerStyle: {
                  width: 10,
                  height: 24,
                  fill: "#F7F7F7",
                  opacity: 1,
                  stroke: "#BFBFBF",
                  lineWidth: 1,
                  radius: 2,
                  highLightFill: "#FFF",
                },
                textStyle: {
                  fill: "#000",
                  opacity: 0.45,
                  fontSize: 12,
                  lineHeight: 12,
                  fontWeight: "normal",
                  stroke: null,
                  lineWidth: 0,
                },
              },
            },
            scrollbar: {
              common: { padding: [8, 8, 8, 8] },
              default: {
                style: {
                  trackColor: "rgba(0,0,0,0)",
                  thumbColor: "rgba(0,0,0,0.15)",
                },
              },
              hover: { style: { thumbColor: "rgba(0,0,0,0.2)" } },
            },
          },
          labels: {
            offset: 12,
            style: {
              fill: "#595959",
              fontSize: 12,
              fontFamily:
                '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
              stroke: null,
              lineWidth: 0,
            },
            fillColorDark: "#2c3542",
            fillColorLight: "#ffffff",
            autoRotate: true,
          },
          innerLabels: {
            style: {
              fill: "#FFFFFF",
              fontSize: 12,
              fontFamily:
                '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
              stroke: null,
              lineWidth: 0,
            },
            autoRotate: true,
          },
          overflowLabels: {
            style: {
              fill: "#595959",
              fontSize: 12,
              fontFamily:
                '"Segoe UI", Roboto, "Helvetica Neue", Arial,\n    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",\n    "Noto Color Emoji"',
              stroke: "#FFFFFF",
              lineWidth: 1,
            },
          },
          pieLabels: {
            labelHeight: 14,
            offset: 10,
            labelLine: { style: { lineWidth: 1 } },
            autoRotate: true,
          },
          styleSheet: {
            brandColor: "#FF6B3B",
            paletteQualitative10: [
              "#FF6B3B",
              "#626681",
              "#FFC100",
              "#9FB40F",
              "#76523B",
              "#DAD5B5",
              "#0E8E89",
              "#E19348",
              "#F383A2",
              "#247FEA",
            ],
            paletteQualitative20: [
              "#FF6B3B",
              "#626681",
              "#FFC100",
              "#9FB40F",
              "#76523B",
              "#DAD5B5",
              "#0E8E89",
              "#E19348",
              "#F383A2",
              "#247FEA",
              "#2BCB95",
              "#B1ABF4",
              "#1D42C2",
              "#1D9ED1",
              "#D64BC0",
              "#255634",
              "#8C8C47",
              "#8CDAE5",
              "#8E283B",
              "#791DC9",
            ],
          },
        },
        data: [[], []],
        xField: "date",
        yField: ["amount", "amount"],
        geometryOptions: [
          {
            geometry: "column",
            isGroup: true,
            seriesField: "name",
            columnWidthRatio: 0.4,
            label: {
              // 可手动配置 label 数据标签位置
              position: "top",
              // 'top', 'middle', 'bottom'
              // 可配置附加的布局方法
              layout: [
                // 柱形图数据标签位置自动调整
                // {
                //   type: "interval-adjust-position",
                // }, 
                // 数据标签防遮挡
                {
                  type: "interval-hide-overlap",
                },
                 // 数据标签文颜色自动调整
                {
                  type: "adjust-color",
                },
              ],
            },
          },

          {
            geometry: "line",
            seriesField: "name",
          },
        ],
      },
    };
  }

  componentDidMount() {
    let { config } = this.state;
    getJdBeanBalance().then((resp) => {
      let data = resp.data;
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      config.data = [data, []];
      this.setState({
        config: config,
      });
    });
  }

  render() {
    let { config } = this.state;
    console.log(config);
    return <DualAxes {...config} />;
  }
}
