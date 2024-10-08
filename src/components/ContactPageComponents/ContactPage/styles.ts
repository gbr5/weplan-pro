import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  margin-top: 2rem;

  width: 100%;
  height: 90vh;
  border-radius: 8px;

  background: var(--letter-color-1);
`;

export const ContactPageHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 4rem;
  width: 100%;
  background: var(--background-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 8px 8px 0 0;
  border: none;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
      height: 2.6rem;
      border-radius: 50%;
      margin-right: 1rem;
      width: 2.6rem;
    }

    > h2 {
      text-transform: capitalize;
    }
  }

  > p {
    width: 104px;
    height: 2.5rem;
    border-radius: 4px;
    background: var(--secondary-color);
    text-decoration: none;
    color: var(--letter-color-5);

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1rem;
    text-transform: uppercase;

    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background: ${shade(0.2, '#ff9900')};
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const PageMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  width: 100%;
  background: var(--background-color);
  padding: 0.5rem 0;

  > button {
    background: transparent;
    border: none;
  }
`;

interface IActiveCampaignProps {
  backgroundColor: string;
  textColor: string;
  ctaBackgroundColor: string;
  ctaTextColor: string;
}

export const ActiveCampaign = styled.div<IActiveCampaignProps>`
  display: flex;
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  height: 3rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;

  position: relative;

  a {
    background: ${props => props.ctaBackgroundColor};
    color: ${props => props.ctaTextColor};
    text-decoration: none;
    height: 2rem;
    padding: 0.4rem;
    min-width: 6rem;
    text-align: center;

    border-radius: 4px;
    border: none;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
    &:hover {
      background: ${props => shade(0.2, `${props.ctaBackgroundColor}`)};
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    }
  }

  span {
    position: absolute;
    top: 0;
    right: 0;

    button {
      background: transparent;
      border: none;
      color: var(--red-color);
    }
  }
`;
