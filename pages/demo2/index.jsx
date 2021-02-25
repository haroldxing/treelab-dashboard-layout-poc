import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { dragSvg, settingSvg } from "../../assets/svg";
import styled from "styled-components";
import { Switch } from "antd";
import _ from "lodash";
import "antd/dist/antd.css";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridContainer = styled.div`
  border: 1px solid gray;
  margin-top: 5px;
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: auto;
`;

const GridItem = styled.div`
  overflow: hidden;
`;

const ItemController = styled.div`
  position: absolute;
  height: 20px;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const OutsideItem = styled.div`
  background: pink;
  width: 100px;
  height: 100px;
`;

const IframeContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 666;
  padding: 48px 16px 16px;
`;

const ModalIframeContainer = styled.div`
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  z-index: 667;
  position: relative;
`;

const ModalIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const ModalMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 666;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = ({ isModalVisible, onCancel }) => {
  return (
    <>
      {isModalVisible && (
        <ModalContainer>
          <ModalMask onClick={onCancel} />
          <ModalIframeContainer>
            <ModalIframe src="https://haroldxing.github.io/treelab-charts-app-poc/#/edit"></ModalIframe>
          </ModalIframeContainer>
        </ModalContainer>
      )}
    </>
  );
};

class MyFirstGrid extends React.Component {
  preLayout = null;
  selectedItem = null;
  dashboardContainerRef = React.createRef();
  maxScrollTop = -1;
  isFirstLoadIframe = false;
  iframeLink = "https://haroldxing.github.io/treelab-charts-app-poc/";

  gridLayoutProps = {
    compactType: "vertical",
    rowHeight: 100,
    // resizeHandles: ["s", "w", "e", "n", "sw", "nw", "se", "ne"],
    cols: { lg: 1, md: 1, sm: 1, xs: 1, xxs: 1 },
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    margin: [10, 10],
    containerPadding: [20, 20],
    isDroppable: true,
    preventCollision: false,
    draggableHandle: ".MyDragHandleClassName",
  };

  componentDidUpdate() {
    if (!this.isFirstLoadIframe) {
      this.dashboardContainerRef.current.addEventListener(
        "scroll",
        _.debounce(this.handleScroll, 100)
      );

      this.handleScroll();

      this.isFirstLoadIframe = true;
    }
  }

  state = {
    isModalVisible: false,
    layout: [
      { i: "0", x: 0, y: 0, w: 12, h: 1 },
      { i: "1", x: 2, y: 0, w: 2, h: 12 },
      { i: "2", x: 4, y: 0, w: 2, h: 3 },
      { i: "3", x: 6, y: 0, w: 1, h: 1 },
      { i: "4", x: 8, y: 0, w: 1, h: 2 },
      { i: "5", x: 10, y: 0, w: 2, h: 1 },
      { i: "6", x: 0, y: 3, w: 2, h: 1 },
      { i: "7", x: 2, y: 4, w: 2, h: 1 },
      { i: "8", x: 4, y: 3, w: 1, h: 2 },
      { i: "9", x: 6, y: 1, w: 2, h: 2 },
      { i: "10", x: 8, y: 2, w: 1, h: 1 },
      { i: "11", x: 10, y: 1, w: 2, h: 3 },
      { i: "12", x: 0, y: 4, w: 2, h: 2 },
      { i: "13", x: 2, y: 5, w: 2, h: 2 },
      { i: "14", x: 4, y: 5, w: 1, h: 1 },
      { i: "15", x: 6, y: 3, w: 1, h: 2 },
      { i: "16", x: 8, y: 3, w: 2, h: 3 },
      { i: "17", x: 10, y: 4, w: 2, h: 2 },
      { i: "18", x: 0, y: 6, w: 2, h: 1 },
      { i: "19", x: 2, y: 7, w: 1, h: 1 },
      { i: "20", x: 8, y: 2, w: 1, h: 1 },
      { i: "21", x: 10, y: 1, w: 2, h: 3 },
      { i: "22", x: 0, y: 4, w: 2, h: 2 },
      { i: "23", x: 2, y: 5, w: 2, h: 2 },
      { i: "24", x: 4, y: 5, w: 1, h: 1 },
      { i: "25", x: 6, y: 3, w: 1, h: 2 },
      { i: "26", x: 8, y: 3, w: 2, h: 3 },
      { i: "27", x: 10, y: 4, w: 2, h: 2 },
      { i: "28", x: 0, y: 6, w: 2, h: 1 },
      { i: "29", x: 2, y: 7, w: 1, h: 1 },
      { i: "30", x: 10, y: 1, w: 2, h: 3 },
      { i: "31", x: 10, y: 1, w: 2, h: 3 },
      { i: "32", x: 0, y: 4, w: 2, h: 2 },
      { i: "33", x: 2, y: 5, w: 2, h: 2 },
      { i: "34", x: 4, y: 5, w: 1, h: 1 },
      { i: "35", x: 6, y: 3, w: 1, h: 2 },
      { i: "36", x: 8, y: 3, w: 2, h: 3 },
      { i: "37", x: 10, y: 4, w: 2, h: 2 },
      { i: "38", x: 0, y: 6, w: 2, h: 1 },
      { i: "39", x: 2, y: 7, w: 1, h: 1 },
      { i: "40", x: 10, y: 1, w: 2, h: 3 },
      { i: "41", x: 10, y: 1, w: 2, h: 3 },
      { i: "42", x: 0, y: 4, w: 2, h: 2 },
      { i: "43", x: 2, y: 5, w: 2, h: 2 },
      { i: "44", x: 4, y: 5, w: 1, h: 1 },
      { i: "45", x: 6, y: 3, w: 1, h: 2 },
      { i: "46", x: 8, y: 3, w: 2, h: 3 },
      { i: "47", x: 10, y: 4, w: 2, h: 2 },
      { i: "48", x: 0, y: 6, w: 2, h: 1 },
      { i: "49", x: 2, y: 7, w: 1, h: 1 },
    ],
    otherLayoutInfos: {
      0: {
        i: "0",
        src: this.iframeLink,
        isSetSrc: false,
      },
      1: {
        i: "1",
        src: this.iframeLink,
        isSetSrc: false,
      },
      2: {
        i: "2",
        src: this.iframeLink,
        isSetSrc: false,
      },
      3: {
        i: "3",
        src: this.iframeLink,
        isSetSrc: false,
      },
      4: {
        i: "4",
        src: this.iframeLink,
        isSetSrc: false,
      },
      5: {
        i: "5",
        src: this.iframeLink,
        isSetSrc: false,
      },
      6: {
        i: "6",
        src: this.iframeLink,
        isSetSrc: false,
      },
      7: {
        i: "7",
        src: this.iframeLink,
        isSetSrc: false,
      },
      8: {
        i: "8",
        src: this.iframeLink,
        isSetSrc: false,
      },
      9: {
        i: "9",
        src: this.iframeLink,
        isSetSrc: false,
      },
      10: {
        i: "10",
        src: this.iframeLink,
        isSetSrc: false,
      },
      11: {
        i: "11",
        src: this.iframeLink,
        isSetSrc: false,
      },
      12: {
        i: "12",
        src: this.iframeLink,
        isSetSrc: false,
      },
      13: {
        i: "13",
        src: this.iframeLink,
        isSetSrc: false,
      },
      14: {
        i: "14",
        src: this.iframeLink,
        isSetSrc: false,
      },
      15: {
        i: "15",
        src: this.iframeLink,
        isSetSrc: false,
      },
      16: {
        i: "16",
        src: this.iframeLink,
        isSetSrc: false,
      },
      17: {
        i: "17",
        src: this.iframeLink,
        isSetSrc: false,
      },
      18: {
        i: "18",
        src: this.iframeLink,
        isSetSrc: false,
      },
      19: {
        i: "19",
        src: this.iframeLink,
        isSetSrc: false,
      },
      20: {
        i: "20",
        src: this.iframeLink,
        isSetSrc: false,
      },
      21: {
        i: "21",
        src: this.iframeLink,
        isSetSrc: false,
      },
      22: {
        i: "22",
        src: this.iframeLink,
        isSetSrc: false,
      },
      23: {
        i: "23",
        src: this.iframeLink,
        isSetSrc: false,
      },
      24: {
        i: "24",
        src: this.iframeLink,
        isSetSrc: false,
      },
      25: {
        i: "25",
        src: this.iframeLink,
        isSetSrc: false,
      },
      26: {
        i: "26",
        src: this.iframeLink,
        isSetSrc: false,
      },
      27: {
        i: "27",
        src: this.iframeLink,
        isSetSrc: false,
      },
      28: {
        i: "28",
        src: this.iframeLink,
        isSetSrc: false,
      },
      29: {
        i: "29",
        src: this.iframeLink,
        isSetSrc: false,
      },
      30: {
        i: "30",
        src: this.iframeLink,
        isSetSrc: false,
      },
      31: {
        i: "31",
        src: this.iframeLink,
        isSetSrc: false,
      },
      32: {
        i: "32",
        src: this.iframeLink,
        isSetSrc: false,
      },
      33: {
        i: "33",
        src: this.iframeLink,
        isSetSrc: false,
      },
      34: {
        i: "34",
        src: this.iframeLink,
        isSetSrc: false,
      },
      35: {
        i: "35",
        src: this.iframeLink,
        isSetSrc: false,
      },
      36: {
        i: "36",
        src: this.iframeLink,
        isSetSrc: false,
      },
      37: {
        i: "37",
        src: this.iframeLink,
        isSetSrc: false,
      },
      38: {
        i: "38",
        src: this.iframeLink,
        isSetSrc: false,
      },
      39: {
        i: "39",
        src: this.iframeLink,
        isSetSrc: false,
      },
      40: {
        i: "40",
        src: this.iframeLink,
        isSetSrc: false,
      },
      41: {
        i: "41",
        src: this.iframeLink,
        isSetSrc: false,
      },
      42: {
        i: "42",
        src: this.iframeLink,
        isSetSrc: false,
      },
      43: {
        i: "43",
        src: this.iframeLink,
        isSetSrc: false,
      },
      44: {
        i: "44",
        src: this.iframeLink,
        isSetSrc: false,
      },
      45: {
        i: "45",
        src: this.iframeLink,
        isSetSrc: false,
      },
      46: {
        i: "46",
        src: this.iframeLink,
        isSetSrc: false,
      },
      47: {
        i: "47",
        src: this.iframeLink,
        isSetSrc: false,
      },
      48: {
        i: "48",
        src: this.iframeLink,
        isSetSrc: false,
      },
      49: {
        i: "49",
        src: this.iframeLink,
        isSetSrc: false,
      },
    },
    staticNum: 6,
    isVerticalCompact: false,
    isLayoutInit: false, // layout 在初始化的时候以为block之间会相互挤压位置，会经历一次 x y 的变动
  };

  calcPositionTop = ({ rowHeight, margin, containerPadding, y }) => {
    var top = Math.round((rowHeight + margin[1]) * y + containerPadding[1]);

    return top;
  };

  handleScroll = () => {
    const containerEl = this.dashboardContainerRef.current;

    if (this.state.isLayoutInit && this.maxScrollTop < containerEl.scrollTop) {
      const { rowHeight, margin, containerPadding } = this.gridLayoutProps;

      let cloneOtherLayoutInfos = { ...this.state.otherLayoutInfos };

      Object.values(cloneOtherLayoutInfos).map((item) => {
        const curItem = this.getItemByKey(item.i);

        if (
          !item.isSetSrc &&
          this.calcPositionTop({
            rowHeight,
            margin,
            containerPadding,
            y: curItem.y,
          }) <=
            containerEl.clientHeight * 2 + containerEl.scrollTop
        ) {
          cloneOtherLayoutInfos[item.i].isSetSrc = true;
        }
      });

      this.setState({
        otherLayoutInfos: cloneOtherLayoutInfos,
      });

      this.maxScrollTop = containerEl.scrollTop;
    }
  };

  getItemByKey = (key) => {
    return this.state.layout.filter((item) => item.i === key)[0];
  };

  checkAndSetIframe = () => {};

  checkIntersect = (blockA, blockB) => {
    return !(
      blockB.x + blockB.w <= blockA.x ||
      blockB.x >= blockA.x + blockA.w ||
      blockB.y + blockB.h <= blockA.y ||
      blockB.y >= blockA.y + blockA.h
    );
  };

  getOtherMovedBlocks = (newLayout, oldLayout) => {
    let movedBlocks = oldLayout
      .filter((item) => item.i !== this.selectedItem.i)
      .filter((item) => {
        let oldItem = newLayout.filter((ele) => ele.i === item.i)[0];

        return item.x !== oldItem.x || item.y !== oldItem.y;
      });

    return movedBlocks;
  };

  getOptimizedLayout = (layout, movedBlocks) => {
    console.log(layout);

    if (movedBlocks.length === 0) return layout;

    let clonedLayout = [...layout];

    movedBlocks.forEach((item) => {
      let isIntersect = false;

      clonedLayout.forEach((ele, index) => {
        if (this.checkIntersect(item, ele) && item.i !== ele.i) {
          isIntersect = true;
        }
      });

      if (!isIntersect) {
        clonedLayout = clonedLayout.map((ele) => {
          if (ele.i === item.i) {
            return item;
          } else {
            return ele;
          }
        });
      }
    });

    return clonedLayout;
  };

  // getOptimizedLayout2 = (layout, movedBlocks) => {
  //   if (movedBlocks.length === 0) return layout;

  //   let clonedLayout = [...layout];

  //   movedBlocks.forEach((item) => {
  //     let currentItem = this.getSpecificElement(item.i, layout);

  //     if (currentItem.y - 1 >= item.y) {
  //       clonedLayout = clonedLayout.filter((ele) => ele.i !== item.i);
  //       clonedLayout.push({ ...item, y: currentItem.y - 1 });
  //     }
  //   });

  //   return clonedLayout;
  // };

  getSpecificElement = (key, array) =>
    array.filter((item) => item.i === key)[0];

  generateDom = () => {
    return this.state.layout.map((item, index) => {
      let curItem = this.state.otherLayoutInfos[item.i];

      curItem = curItem
        ? curItem
        : {
            i: item.i,
            src: this.iframeLink,
            isSetSrc: true,
          };

      if (item.i === "47") {
        console.log("curItem.isSetSrc", curItem.isSetSrc);
        console.log("curItem.src", curItem.src);
        console.log("item.i", item.i);
      }

      return (
        <GridItem key={item.i}>
          <ItemController>
            <span>{item.i}</span>
            <span onClick={() => this.handleModalVisible(true)}>
              {settingSvg}
            </span>
            {dragSvg}
          </ItemController>
          <IframeContainer>
            <Iframe src={curItem.isSetSrc ? curItem.src : ""}>{index}</Iframe>
          </IframeContainer>
        </GridItem>
      );
    });
  };

  isScrolledIntoView = (el) => {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;

    let isVisible = elemTop <= window.innerHeight;

    return isVisible;
  };

  setValues = (layout, oldItem, newItem) => {
    this.preLayout = layout;
    this.selectedItem = oldItem;
  };

  resizeAndDragStopHandle = (layout, oldItem, newItem) => {
    if (this.state.isVerticalCompact) {
      return;
    }

    let movedBlocks = this.getOtherMovedBlocks(layout, this.preLayout);
    let newLayout = this.getOptimizedLayout(layout, movedBlocks);
    this.preLayout = newLayout;

    this.setState({ layout: newLayout });
  };

  sortLayoutItemsByColRow = (layout) => {
    return layout.slice(0).sort(function (a, b) {
      if (a.x > b.x || (a.x === b.x && a.y > b.y)) {
        return 1;
      }

      return -1;
    });
  };

  handleModalVisible = (status) => {
    this.setState({ isModalVisible: status });
  };

  switchOnChange = (checked) => {
    this.setState({ isVerticalCompact: !checked });
  };

  // resizingHandle = (layout, oldItem, newItem) => {
  //   console.log(111);

  //   let movedBlocks = this.getOtherMovedBlocks(layout, this.preLayout);

  //   if (this.selectedItem.h > newItem.h) {
  //     let newLayout = this.getOptimizedLayout2(layout, movedBlocks);
  //     this.setState({ layout: newLayout, compactType: Math.random() });
  //   }

  //   this.selectedItem = newItem;
  // };

  render() {
    const otherGridLayoutProps = {
      verticalCompact: this.state.isVerticalCompact,
      layouts: {
        lg: this.state.layout,
        md: this.state.layout,
        sm: this.state.layout,
        xs: this.state.layout,
        xxs: this.state.layout,
      },
      droppingItem: { i: this.state.layout.length.toString(), w: 2, h: 2 },
      onResizeStart: this.setValues,
      onResizeStop: this.resizeAndDragStopHandle,
      onDragStart: this.setValues,
      onDragStop: this.resizeAndDragStopHandle,
      onDrop: (layout, item, event) => {
        this.setState({ layout, elementNum: this.state.layout.length + 1 });
      },
      onLayoutChange: (layout) => {
        if (!this.state.isLayoutInit) {
          this.setState({ isLayoutInit: true, layout });
        }
      },
    };

    return (
      <>
        <Modal
          isModalVisible={this.state.isModalVisible}
          onCancel={() => this.handleModalVisible(false)}
        />
        <OutsideItem draggable> Outside item</OutsideItem>
        <Switch defaultChecked onChange={this.switchOnChange} /> 吸附非吸附切换
        <GridContainer ref={this.dashboardContainerRef}>
          <ResponsiveReactGridLayout
            className="layout"
            {...otherGridLayoutProps}
            {...this.gridLayoutProps}
          >
            {this.generateDom()}
          </ResponsiveReactGridLayout>
        </GridContainer>
        {/* <iframe src="http://localhost:5000/test-2021-2-19"></iframe> */}
      </>
    );
  }
}

export default MyFirstGrid;
