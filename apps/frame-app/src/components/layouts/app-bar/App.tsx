import { memo } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";

import { useFocusApp } from "@/queries/ContextQuery";
import { getRemoteAppURL } from "@/router";

interface Props {
  context: FrameApp.AppContext;
}

export const App: React.FC<Props> = memo(({ context }) => {
  const { id, favicon, name } = context;
  const { mutate } = useFocusApp();

  return (
    <li>
      <Container to={getRemoteAppURL(id)} onClick={() => mutate(context)}>
        <AppIcon src={favicon} alt={`${name} icon`} />
        <Title title={name}>{name}</Title>
        <CloseButton title="앱 닫기">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </CloseButton>
      </Container>
    </li>
  );
});

const Container = styled(NavLink)`
  display: flex;

  margin: 2px 0;
  width: 100%;
  height: 32px;

  border-radius: 4px;
  border: 1px solid transparent;

  overflow: hidden;
  color: var(--text-color);
  text-decoration: none;
  outline: none;

  &[aria-current] {
    box-shadow: var(--appBar-app-active-shadow);
    border-color: var(--appBar-app-active-border);
    background-color: var(--appBar-app-active-background);
  }

  :hover {
    background-color: var(--appBar-app-hover-background);
  }
`;

const AppIcon = styled.img`
  padding: 7px;
  width: 30px;
  height: 30px;
  aspect-ratio: 1;
`;

const Title = styled.div`
  padding-bottom: 7px;

  flex: 1;

  font-size: 14px;
  line-height: 30px;
  vertical-align: bottom;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CloseButton = styled.div`
  margin: 7px;
  width: 16px;
  height: 16px;
  border-radius: 4px;

  font-size: 12px;
  line-height: 16px;
  font-weight: bold;
  text-align: center;

  svg {
    margin: 2px;
    width: 12px;
    height: 12px;
    fill: var(--text-color);
  }

  :hover {
    background-color: var(--appBar-appClose-hover-background);
  }
`;