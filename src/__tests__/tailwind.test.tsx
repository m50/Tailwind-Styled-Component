import React, { useEffect, useRef } from 'react'
import tw from '../tailwind'
import { act, render } from '@testing-library/react';

interface TestCompProps {
  className?: string
  someThingElse?: string
  ref?: unknown
  children?: React.ReactNode | React.ReactNode[]
}

describe('tw', () => {
  it('passes ref [Type Test]', async () => {
    const Div = tw.div`bg-gray-400`;
    let r: any = undefined;
    const HasRef = () => {
      const ref = useRef<HTMLDivElement>();
      useEffect(() => {
        r = ref;
      }, [ref]);
      return <Div data-testid="mydiv" ref={ref}>ref</Div>
    }
    render(<HasRef />);
    await act(async () => {
      expect(r).not.toBeUndefined();
      expect(r.current).not.toBeUndefined();
      expect(r.current.localName).toBe('div');
    });
  })

  it('matches snapshot with intrinsic element', () => {
    const Div = tw.div`bg-gray-400`;
    const { asFragment } = render(<Div>test</Div>);
    expect(asFragment()).toMatchSnapshot();
  })

  it('matches snapshot with function component', () => {
    const TestComp: React.FC<TestCompProps> = ({ className, children }) => <div className={className}>{children}</div>
    const TestCompStyled = tw(TestComp)`bg-gray-400`;
    const { asFragment } = render(<TestCompStyled>test</TestCompStyled>);
    expect(asFragment()).toMatchSnapshot();
  })

  it('matches snapshot with class component', () => {
    class TestComp extends React.Component<TestCompProps> {
      render() {
        return <div className={this.props.className}>{this.props.children}</div>
      }
    }
    const TestCompStyled = tw(TestComp)`bg-gray-400`;
    const { asFragment } = render(<TestCompStyled>test</TestCompStyled>);
    expect(asFragment()).toMatchSnapshot();
  })
})
