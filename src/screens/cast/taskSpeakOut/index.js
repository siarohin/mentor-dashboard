import $ from 'jquery';
import { Howl } from 'howler';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';
import Sound from '../../../components/sound';

const spriteSource = {
  unit1: [5000, 16000],
  unit2: [22000, 25000],
  unit3: [50000, 10000],
  unit4: [63000, 15000],
  unit5: [81000, 15000],
  unit6: [99000, 17000],
  unit7: [115000, 7000],
};

const spriteNames = [];
$.each(spriteSource, (key) => {
  spriteNames.push(key);
});

const randomSprite = () => {
  return uniqueRandomArray(spriteNames)();
};

const music = new Howl({
  src: ['../../../music/speakout.mp3'],
  sprite: spriteSource,
  autoplay: false,
  loop: false,
  volume: 1.0,
});

export default class taskSpeakOut {
  static get healthPoint() {
    const health = 50;
    return health;
  }

  static playAudio(sprite) {
    if (!$('.nav-sound').hasClass('sound-off')) {
      Sound.stop();
      music.play(sprite);
    }
  }

  static init() {
    this.playAudio(randomSprite());
    this.draw();
    this.generateRandom();
    this.modalShow();
    this.closeTask();
  }

  static get data() {
    return vocabulary;
  }

  static draw() {
    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const title = document.querySelector('.modal-title');
    title.innerHTML = 'Проверим твой английский, герой! Нажми на плеер, прослушай запись и введи имя, которое ты услышал.';

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static generateRandom() {
    const dataSource = this.data;

    const randomTask = uniqueRandomArray(dataSource)();
    const getWord = randomTask.word;
    const getTranslation = randomTask.translation;
    const getImage = randomTask.image;

    this.answer = getTranslation;
    this.generateSpeakOutTask(getWord, getImage);
  }

  static generateSpeakOutTask(getWord, getImage) {
    const vocabularyKey = document.querySelector('.vocabulary-key');
    vocabularyKey.textContent = getWord;

    const vocabularryImg = document.querySelector('.vocabulary-img');
    $(vocabularryImg).css('background-position', ` ${getImage}`);
  }

  static checkResult() {
    this.playerAnswer = document.querySelector('.input-answer').value
      .toLowerCase()
      .trim();

    // ES7 includes
    if ((this.answer).includes(this.playerAnswer)) {
      return true;
    } return false;
  }

  static empty() {
    $('#taskSpeakOut').empty();
  }

  static modalShow() {
    $('#spels').modal('show');
  }

  static modalHide() {
    $('#spels').modal('hide');
  }

  static updateState() {
    // if true -> playerAttack, if false -> monsterAttack
    if (this.checkResult()) {
      window.gameState.monsterHealth -= this.healthPoint;
      Battle.playerAttack(3000);
    } else {
      window.gameState.playerHealth -= this.healthPoint;
      Battle.monsterAttack(3000);
    }
  }

  static play() {
    this.updateState();
    Battle.updateState();
  }

  static closeTask() {
    $('.input-group').on('click keypress', (e) => {
      if ((e.key === 'Enter' && e.type === 'keypress')
      || (e.target.type === 'button' && e.type === 'click')) {
        this.modalHide();
        music.stop();
        this.play();
      }
    });
  }
}
