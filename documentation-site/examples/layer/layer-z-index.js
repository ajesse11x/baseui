/* global document */
// @flow
import * as React from 'react';
import {
  Layer,
  LayersManager,
  TetherBehavior,
  TETHER_PLACEMENT,
} from 'baseui/layer';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

function BlockComponent(props) {
  return (
    <Block
      ref={props.forwardedRef}
      position="absolute"
      top={`${props.offset.top}px` || '50%'}
      left={`${props.offset.left}px` || '50%'}
      width="200px"
      paddingTop="20px"
      paddingBottom="20px"
      paddingLeft="20px"
      paddingRight="20px"
      backgroundColor={props.color}
      overrides={{
        Block: {
          style: {
            textAlign: 'center',
          },
        },
      }}
    >
      {props.children}
    </Block>
  );
}

const initialState = {
  isFirstOpen: false,
  isSecondOpen: false,
  isFirstMounted: false,
  isSecondMounted: false,
  setIsFirstMounted: false,
  offset1: {top: 0, left: 0},
  offset2: {top: 0, left: 0},
};
export default class LayerWithZIndex extends React.Component<
  {},
  typeof initialState,
> {
  anchorRef1: any = React.createRef();
  popperRef1: any = React.createRef();
  anchorRef2: any = React.createRef();
  popperRef2: any = React.createRef();

  state = initialState;

  onPopperUpdate: any = (order, normalizedOffsets) => {
    this.setState({
      [`offset${order}`]: normalizedOffsets.popper,
    });
  };

  render() {
    return (
      // WARNING: DO NOT COPY THIS EXAMPLE AS IS. THIS EXAMPLE HAS LOCAL LayersManager
      // JUST FOR DOCUMENTATION EXAMPLE PRESENTATIONAL PURPOSE.
      // Do not wrap a single component or a part of an application with
      // LayersManager that has zIndex set to a value other than 'auto' since it
      // will make all the Layers within its context be on top of other Layers
      // outside of the local LayersManager (therefore layers provider) added later.
      // Pass the `zIndex` value to the LayersManager added at the root of your application.
      <LayersManager zIndex={2}>
        <Block
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Block>
            <Button
              ref={this.anchorRef1}
              onClick={() => this.setState({isFirstOpen: true})}
            >
              Render Yellow Layer
            </Button>
            {this.state.isFirstOpen ? (
              <Layer
                onMount={() =>
                  this.setState({setIsFirstMounted: true})
                }
                onUnmount={() =>
                  this.setState({setIsFirstMounted: false})
                }
              >
                <TetherBehavior
                  anchorRef={this.anchorRef1.current}
                  popperRef={this.popperRef1.current}
                  onPopperUpdate={(...args) =>
                    this.onPopperUpdate(1, ...args)
                  }
                  placement={TETHER_PLACEMENT.right}
                >
                  <BlockComponent
                    forwardedRef={this.popperRef1}
                    offset={this.state.offset1}
                    color="rgba(255, 255, 190, 0.86)"
                  >
                    <Button
                      onClick={() =>
                        this.setState({isFirstOpen: false})
                      }
                    >
                      Close
                    </Button>
                  </BlockComponent>
                </TetherBehavior>
              </Layer>
            ) : null}
            <Block padding="5px" />
            <Button
              ref={this.anchorRef2}
              onClick={() => this.setState({isSecondOpen: true})}
            >
              Render Green Layer
            </Button>
            {this.state.isSecondOpen ? (
              <Layer
                onMount={() =>
                  this.setState({isSecondMounted: true})
                }
                onUnmount={() =>
                  this.setState({isSecondMounted: false})
                }
              >
                <TetherBehavior
                  anchorRef={this.anchorRef2.current}
                  popperRef={this.popperRef2.current}
                  onPopperUpdate={(...args) =>
                    this.onPopperUpdate(2, ...args)
                  }
                  placement={TETHER_PLACEMENT.right}
                >
                  <BlockComponent
                    forwardedRef={this.popperRef2}
                    offset={this.state.offset2}
                    color="rgba(190, 255, 190, 0.86)"
                  >
                    <Button
                      onClick={() =>
                        this.setState({isSecondOpen: false})
                      }
                    >
                      Close
                    </Button>
                  </BlockComponent>
                </TetherBehavior>
              </Layer>
            ) : null}
          </Block>
          <Block
            position="relative"
            boxSizing="border-box"
            width="200px"
            marginLeft="50px"
            display="flex"
            alignItems="center"
            paddingLeft="20px"
            paddingRight="20px"
            paddingTop="20px"
            paddingBottom="20px"
            backgroundColor="#000000"
            color="#ffffff"
            overrides={{
              Block: {
                style: {
                  boxSizing: 'border-box',
                  zIndex: 1,
                  textAlign: 'center',
                },
              },
            }}
          >
            Element with z-index set
          </Block>
        </Block>
      </LayersManager>
    );
  }
}
