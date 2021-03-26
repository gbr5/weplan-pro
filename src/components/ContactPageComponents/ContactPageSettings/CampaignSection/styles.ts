import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 1rem 0;

  h3 {
    margin: 0.5rem auto;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }

  > span {
    position: absolute;
    top: 2px;
    right: 2px;

    > button {
      background: transparent;
      border: none;
      color: var(--red-color);
    }
  }
  > section {
    width: 100%;
    display: flex;
    flex-direction: column;

    > strong {
      margin: 1rem auto 0.25rem;
      text-align: left;
      padding: 0.5rem;
      width: 100%;
    }

    > p {
      width: 100%;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      text-align: center;
      padding: 0.5rem;
    }
  }
`;

export const CampaignContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  > h2 {
    margin: 0.5rem auto;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }

  > span {
    position: absolute;
    top: 2px;
    right: 2px;

    > button {
      background: transparent;
      border: none;
      color: var(--red-color);
    }
  }

  > section {
    width: 100%;
    display: flex;
    flex-direction: column;

    > strong {
      margin: 1rem auto;
      text-align: left;
      border-bottom: 1px solid var(--secondary-color);
      padding: 0.5rem;
      width: 100%;
    }

    > p {
      width: 100%;
      margin: 0.5rem auto;
      border-radius: 4px;
      text-align: center;
      padding: 0.5rem;
      border: 1px solid var(--letter-color-2);
    }
    > img {
      height: 240px;
      width: 240px;
      border-radius: 8px;
      margin: 0 auto;
    }
  }
`;

export const NotActiveCampaigns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  width: 100%;

  > h2 {
    margin: 0.5rem auto;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }
`;
export const Campaign = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem auto;
  margin: 0.5rem auto;

  border-bottom: 1px solid var(--letter-color-2);
`;

export const CampaignButton = styled.button`
  background: transparent;
  border: none;
`;

export const IsActive = styled.button`
  background: transparent;
  border: none;
`;

export const AddField = styled.button`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  background: var(--secondary-color);

  transition: 0.3s;

  margin: 1rem auto 2rem;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
    background: ${shade(0.2, `#ff9900`)};
  }
`;
