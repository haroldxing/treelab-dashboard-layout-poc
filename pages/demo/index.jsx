import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import styled from "styled-components";
import { Switch } from "antd";

import "antd/dist/antd.css";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GridContainer = styled.div`
  border: 1px solid gray;
  margin-top: 5px;
`;

const GridItem = styled.div`
  background: beige;
`;

const OutsideItem = styled.div`
  background: pink;
  width: 100px;
  height: 100px;
`;

class MyFirstGrid extends React.Component {
  preLayout = null;
  selectedItem = null;

  state = {
    layout: [
      { i: "0", x: 0, y: 0, w: 2, h: 3, minW: 2, maxW: 4 },
      { i: "1", x: 2, y: 0, w: 2, h: 4 },
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
      { i: "17", x: 10, y: 4, w: 2, h: 2, static: true },
      { i: "18", x: 0, y: 6, w: 2, h: 1 },
      { i: "19", x: 2, y: 7, w: 1, h: 1 },
    ],
    elementNum: 20,
    staticNum: 6,
    isVerticalCompact: false,
  };

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

  sortLayout = (layout) => {}; //layout need sort

  getOptimizedLayout = (layout, movedBlocks) => {
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
        clonedLayout = clonedLayout.filter((ele) => ele.i !== item.i);
        clonedLayout.push(item);
      }
    });

    return clonedLayout;
  };

  generateDom = (elementNum) => {
    return new Array(elementNum).fill(undefined).map((item, index) => {
      return <GridItem key={index.toString()}>{index}</GridItem>;
    });
  };

  setValues = (layout, oldItem) => {
    this.preLayout = layout;
    this.selectedItem = oldItem;
  };

  resizeAndDragStopHandle = (layout, oldItem, newItem) => {
    let movedBlocks = this.getOtherMovedBlocks(layout, this.preLayout);
    let newLayout = this.getOptimizedLayout(layout, movedBlocks);

    this.setState({ layout: newLayout });
  };

  switchOnChange = (checked) => {
    this.setState({ isVerticalCompact: !checked });
  };

  render() {
    const gridLayoutProps = {
      verticalCompact: this.state.isVerticalCompact,
      compactType: "vertical",
      layouts: {
        lg: this.state.layout,
        md: this.state.layout,
        sm: this.state.layout,
        xs: this.state.layout,
        xxs: this.state.layout,
      },
      rowHeight: 30,
      resizeHandles: ["s", "w", "e", "n", "sw", "nw", "se", "ne"],
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      margin: [30, 30],
      containerPadding: [20, 20],
      droppingItem: { i: this.state.elementNum.toString(), w: 2, h: 2 },
      isDroppable: true,
      onResizeStart: this.setValues,
      onResizeStop: this.resizeAndDragStopHandle,

      onDragStart: this.setValues,
      onDragStop: this.resizeAndDragStopHandle,
      onDrop: (layout, item, event) => {
        this.setState({ layout, elementNum: this.state.elementNum + 1 });
      },
      preventCollision: false,
    };

    return (
      <>
        <OutsideItem draggable> Outside item</OutsideItem>
        <Switch defaultChecked onChange={this.switchOnChange} /> 吸附非吸附切换
        <GridContainer>
          <ResponsiveReactGridLayout className="layout" {...gridLayoutProps}>
            {this.generateDom(this.state.elementNum)}
          </ResponsiveReactGridLayout>
        </GridContainer>
      </>
    );
  }
}

export default MyFirstGrid;
