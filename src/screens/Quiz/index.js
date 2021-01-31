/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Lottie } from '@crello/react-lottie';
import { motion } from 'framer-motion';

import db from '../../../db.json';

import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AlternativesForm';
import GitHubCorner from '../../components/GitHubCorner';
import BackLinkArrow from '../../components/BackLinkArrow';
import Link from '../../components/Link';

import loadingAnimation from './animations/loading.json';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />

      </Widget.Content>
    </Widget>
  );
}

const SVGWrapper = styled.div`
  display: flex; 
  justify-content: center;
  margin-top: 24px;
`;
function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
  widgetXPos,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget
      as={motion.div}
      transition={{ duration: 0.5 }}
      variants={{
        show: { opacity: 1, x: widgetXPos },
        hidden: { opacity: 0, x: '-100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição da imagem"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            addResult(isCorrect);
            setTimeout(() => {
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 1 * 500);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect
          && (
            <SVGWrapper>
              <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21.5" cy="21.5" r="21.5" fill="#4CAF50" fillOpacity="0.2" />
                <circle cx="21.4999" cy="21.5" r="16.5385" fill="white" />
                <path d="M21.4999 4.96155C12.4037 4.96155 4.96143 12.4039 4.96143 21.5C4.96143 30.5962 12.4037 38.0385 21.4999 38.0385C30.596 38.0385 38.0383 30.5962 38.0383 21.5C38.0383 12.4039 30.596 4.96155 21.4999 4.96155ZM28.446 18.6885L20.5076 26.6269C19.846 27.2885 18.8537 27.2885 18.1922 26.6269L14.5537 22.9885C13.8922 22.3269 13.8922 21.3346 14.5537 20.6731C15.2153 20.0115 16.2076 20.0115 16.8691 20.6731L19.3499 23.1539L26.1307 16.3731C26.7922 15.7115 27.7845 15.7115 28.446 16.3731C29.1076 17.0346 29.1076 18.0269 28.446 18.6885Z" fill="#4CAF50" />
              </svg>
            </SVGWrapper>
          )}
          {isQuestionSubmited && !isCorrect
          && (
          <SVGWrapper>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M34.0381 17.9617C33.8367 17.7586 33.5971 17.5974 33.3331 17.4874C33.069 17.3774 32.7858 17.3208 32.4998 17.3208C32.2138 17.3208 31.9306 17.3774 31.6666 17.4874C31.4025 17.5974 31.1629 17.7586 30.9615 17.9617L25.9998 22.945L21.0381 17.9617C20.6301 17.5537 20.0768 17.3245 19.4998 17.3245C18.9228 17.3245 18.3695 17.5537 17.9615 17.9617C17.5535 18.3696 17.3243 18.923 17.3243 19.5C17.3243 20.077 17.5535 20.6303 17.9615 21.0383L22.9448 26L17.9615 30.9617C17.7584 31.1631 17.5972 31.4027 17.4872 31.6667C17.3772 31.9308 17.3206 32.214 17.3206 32.5C17.3206 32.786 17.3772 33.0692 17.4872 33.3332C17.5972 33.5973 17.7584 33.8369 17.9615 34.0383C18.1629 34.2414 18.4025 34.4026 18.6666 34.5126C18.9306 34.6226 19.2138 34.6792 19.4998 34.6792C19.7858 34.6792 20.069 34.6226 20.3331 34.5126C20.5971 34.4026 20.8367 34.2414 21.0381 34.0383L25.9998 29.055L30.9615 34.0383C31.1629 34.2414 31.4025 34.4026 31.6666 34.5126C31.9306 34.6226 32.2138 34.6792 32.4998 34.6792C32.7858 34.6792 33.069 34.6226 33.3331 34.5126C33.5971 34.4026 33.8367 34.2414 34.0381 34.0383C34.2412 33.8369 34.4024 33.5973 34.5124 33.3332C34.6224 33.0692 34.679 32.786 34.679 32.5C34.679 32.214 34.6224 31.9308 34.5124 31.6667C34.4024 31.4027 34.2412 31.1631 34.0381 30.9617L29.0548 26L34.0381 21.0383C34.2412 20.8369 34.4024 20.5973 34.5124 20.3332C34.6224 20.0692 34.679 19.786 34.679 19.5C34.679 19.214 34.6224 18.9308 34.5124 18.6667C34.4024 18.4027 34.2412 18.1631 34.0381 17.9617ZM41.3181 10.6817C39.3195 8.61227 36.9287 6.96165 34.2852 5.82613C31.6418 4.6906 28.7987 4.0929 25.9218 4.0679C23.0449 4.0429 20.1919 4.5911 17.5291 5.68052C14.8664 6.76994 12.4473 8.37876 10.4129 10.4131C8.37857 12.4474 6.76976 14.8666 5.68034 17.5293C4.59092 20.1921 4.04271 23.0451 4.06771 25.922C4.09271 28.7989 4.69041 31.642 5.82594 34.2854C6.96147 36.9288 8.61208 39.3196 10.6815 41.3183C12.6802 43.3877 15.071 45.0383 17.7144 46.1739C20.3578 47.3094 23.2009 47.9071 26.0778 47.9321C28.9547 47.9571 31.8077 47.4089 34.4705 46.3195C37.1332 45.23 39.5524 43.6212 41.5867 41.5869C43.621 39.5525 45.2299 37.1334 46.3193 34.4707C47.4087 31.8079 47.9569 28.9548 47.9319 26.078C47.9069 23.2011 47.3092 20.358 46.1737 17.7146C45.0381 15.0711 43.3875 12.6803 41.3181 10.6817ZM38.2631 38.2633C35.4292 41.1004 31.6993 42.8671 27.7089 43.2625C23.7184 43.6579 19.7143 42.6574 16.3788 40.4317C13.0432 38.2059 10.5826 34.8924 9.41608 31.0559C8.24958 27.2193 8.44938 23.097 9.98145 19.3912C11.5135 15.6854 14.2831 12.6255 17.8182 10.7327C21.3534 8.83994 25.4355 8.23144 29.369 9.01088C33.3025 9.79032 36.8441 11.9095 39.3903 15.0073C41.9366 18.1052 43.33 21.99 43.3331 26C43.3409 28.2778 42.8968 30.5345 42.0265 32.6395C41.1562 34.7445 39.8771 36.656 38.2631 38.2633Z" fill="#FF5722" />
            </svg>
          </SVGWrapper>
          )}

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.string.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// ajustar
function getResults(callback) {
  fetch('/api/results')
    .then((resp) => resp.json())
    .then((data) => {
      callback(data.results);
    });
}

function ResultWidget({ result }) {
  const router = useRouter();
  const nome = router.query.name;
  const [placar, setPlacar] = React.useState([]);

  React.useEffect(() => { getResults(setPlacar); }, []);

  return (
    <Widget
      as={motion.div}
      transition={{ duration: 1 }}
      variants={{
        show: { opacity: 1, y: '0', rotate: 360 },
        hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
        Tela de Resultados
      </Widget.Header>

      <Widget.Content>
        <h1>
          Parabéns
          {' '}
          {nome}
          !
        </h1>
        <p>
          Você fez
          {' '}
          {result}
          {' '}
          pontos!
        </p>
        <br />
        <h1>Placar:</h1>
        <ul>
          {
            placar.map((e) => (
              <li>
                <Widget.Topic>
                  {`Nome: ${e.name} - ${e.value} pontos`}
                </Widget.Topic>
              </li>
            ))
          }
        </ul>

        <br />

        <div style={{ textAlign: 'center' }}>
          <Button href="/" as={Link} style={{ textDecoration: 'none' }}>
            Voltar
          </Button>
        </div>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [widgetXPos, setWidgetXPos] = React.useState(0);
  const [result, setResult] = React.useState(0);

  const router = useRouter();
  const nome = router.query.name;

  const questionIndex = currentQuestion;
  const [results, setResults] = React.useState([]);
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    const { innerWidth: width } = window;
    setWidgetXPos(width);

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
      setTimeout(() => {
        setWidgetXPos(0);
      }, 500);
    } else {
      setWidgetXPos(width);
      setTimeout(() => {
        setScreenState(screenStates.RESULT);

        const placar = results.filter((x) => x).reduce((total) => total + 100, 0);
        setResult(placar);

        fetch('/api/results', {
          method: 'POST',
          body: JSON.stringify({
            name: nome,
            result: placar,
          }),
        });
      }, 500);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
          addResult={addResult}
          widgetXPos={widgetXPos}
        />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT
        && <ResultWidget result={result} />}

      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/pedrofelipemm" />

    </QuizBackground>
  );
}
