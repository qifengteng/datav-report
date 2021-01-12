<!--
 * @Author: qifengteng
 * @Date: 2020-12-29 23:55:47
 * @LastEditors: qifengteng
 * @LastEditTime: 2021-01-06 22:23:51
 * @Description: i love you mikasa
-->
<template>
  <ve-bmap
    :settings="chartSettings"
    :title="title"
    :tooltip="{}"
    :series="chartSeries"
    height="100%"
  />
</template>
<script>
import commonDataMixin from '@/mixins/commonDataMixin'
/* eslint-disable */
const convertData = function(data, geo) {
  const res = [];
  data.forEach(item => {
    const { name, value } = item;
    const coord = geo[name];
    res.push({
      name,
      value: [...coord, value]
    });
  });
  return res;
};
export default {
  name: "BMapScatter",
  mixins: [commonDataMixin],
  data() {
    return {
      title: {
        text: "慕课外卖销售数据大盘",
        subtext: "销售趋势统计",
        sublink:
          "http://www.youbaobao.xyz/datav-docs/guide/guide/bmap-webpack.html",
        left: "center"
      },
      chartSettings: {
        key: "G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb",
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd"
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1"
                }
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999"
                }
              }
            ]
          }
        }
      },
      chartSeries: []
    };
  },
  watch: {
    mapData () {
      const {data, geo} = this.mapData
      this.chartSeries = [{
          name: "销售额",
          type: "scatter", // 散点图
          coordinateSystem: "bmap", // 坐标系
          data: convertData(data, geo),
          encode: {
            value: 2 // 表示数据的第二项
          },
          itemStyle: {
            color: "purple"
          },
          symbolSize: function(val) {
            // 这里的val拿到的是value数组
            return val[2] / 10;
          },
          label: {
            // 显示label
            show: false,
            position: "right",
            // formatter: '{b}'
            formatter: function(v) {
              return `${v.data.name} - ${v.data.value[2]}`;
            }
          },
          emphasis: {
            // 强调
            label: {
              show: true
            }
          }
        },
        {
          name: "Top 10",
          type: "effectScatter",
          coordinateSystem: "bmap",
          data: convertData(
            (data.sort(function(a, b) {
              return b.value - a.value;
            })
          ), geo).slice(0, 10),
          itemStyle: {
            color: "purple",
            shadowBlur: 10,
            shadowColor: "#333"
          },
          symboSize: function(val) {
            return val[2] / 10;
          },
          encode: {
            value: 2
          },
          label: {
            show: false,
            position: "right",
            formatter: function(v) {
              return `${v.data.name} - ${v.data.value[2]}`;
            }
          },
          emphasis: {
            label: {
              show: true
            }
          },
          hoverAnimation: true, // hover效果
          rippleEffect: {
            // 涟漪特效相关配置
            brushType: "stroke", // 空心
            scale: 6
          }
        }
      ]
    }
  }
};
</script>
