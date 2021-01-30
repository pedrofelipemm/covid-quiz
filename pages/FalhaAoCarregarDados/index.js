/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

import db from '../../db.json';

import Link from '../../src/components/Link';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import GitHubCorner from '../../src/components/GitHubCorner';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import BackLinkArrow from '../../src/components/BackLinkArrow';

export async function getServerSideProps(context) {
  const { query } = context.query;

  return {
    props: {
      query,
    },
  };
}

export default function Falha({ query }) {
  const [projectName, githubUser] = query.split('___');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <BackLinkArrow href="/" />
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <h1>Falha ao carregar dados do quiz:</h1>
            <p>
              <strong>Projeto: </strong>
              {' '}
              {projectName}
            </p>
            <p>
              <strong>Usuário: </strong>
              {githubUser}
            </p>
            <br />

            <div style={{ textAlign: 'center' }}>
              <Button href="/" as={Link} style={{ textDecoration: 'none' }}>
                Voltar
              </Button>
            </div>

          </Widget.Content>
        </Widget>

      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/pedrofelipemm" />

    </QuizBackground>
  );
}
