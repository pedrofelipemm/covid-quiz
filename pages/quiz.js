import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';

// ajustar
export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Teste() {
  const router = useRouter();

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>COVID Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>COVID Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              {router.query.name}
            </p>
          </Widget.Content>
        </Widget>
      </QuizContainer>
    </QuizBackground>
  );
}
