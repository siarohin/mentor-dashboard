import $ from 'jquery';
import { Howl } from 'howler';
import uniqueRandomArray from 'unique-random-array';

import template from './index.template';
import './index.css';
// eslint-disable-next-line import/no-cycle
import Battle from '../../battle';
import vocabulary from './vocabulary';
import Sound from '../../../components/sound';
import { getInputFocus, keyControlLeftRightUpDown } from '../../../utils/utils';


const speakout = new Howl({
  src: ['./music/speakout.mp3'],
  sprite: {
    unit1: [5000, 16000],
    unit2: [22000, 25000],
    unit3: [50000, 10000],
    unit4: [63000, 15000],
    unit5: [81000, 15000],
    unit6: [99000, 17000],
    unit7: [115000, 7000],
    unit8: [126000, 25000],
    unit9: [155000, 40000],
    unit10: [198000, 36000],
    unit11: [238000, 41000],
  },
  autoplay: false,
  preload: false,
  loop: false,
  volume: 1.0,
  onend() {
    $('.js-speakOut__audio-button').removeClass('audio-button_pause');
  },
  onload() {
    $('.speakOut-preloader').remove();
    $('.speakOut-content').show();
    getInputFocus();
  },
});

export default class taskSpeakOut {
  static get healthPoint() {
    const health = 50;
    return health;
  }

  static get data() {
    return vocabulary;
  }

  static playAudio(sprite) {
    Sound.stop();
    speakout.play(sprite);
  }

  static load() {
    speakout.load();
  }

  static stopAudio() {
    speakout.stop();
  }

  static init() {
    this.draw();
    this.load();
    this.initAudioButton();
    this.generateRandom();
    this.modalShow();
    keyControlLeftRightUpDown();
    this.closeTask();
  }

  static initAudioButton() {
    $('.js-speakOut__audio-button').on('click', (e) => {
      e.preventDefault();

      if ($('.js-speakOut__audio-button').hasClass('audio-button_pause')) {
        $('.js-speakOut__audio-button').removeClass('audio-button_pause');
        this.stopAudio();
      } else {
        $('.js-speakOut__audio-button').addClass('audio-button_pause');
        this.playAudio(this.sprite);
      }
    });
  }

  static draw() {
    $('#spels .modal-body').empty();

    const contentEl = document.querySelector('#spels .modal-body');
    contentEl.innerHTML = template;

    const description = document.querySelector('.js-speakOut__description');
    description.innerHTML = `
      Нажми на плеер, прослушай запись и введи имя, которое ты услышал.`;

    const title = document.querySelector('.modal-title');
    title.innerHTML = 'Проверим твой английский, герой!';

    $('.speakOut-content').hide();

    $('#spels').modal({
      keyboard: false,
      backdrop: 'static',
    });
  }

  static generateRandom() {
    const dataSource = this.data;

    const randomTask = uniqueRandomArray(dataSource)();
    const randomSprite = randomTask.sprite;
    this.sprite = randomSprite;
    this.answer = randomTask.word;
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
      if ((e.key === 'Enter' && e.type === 'keypress'
        && e.target.type === 'text')
      || (e.target.type === 'button' && e.type === 'click')) {
        this.modalHide();
        speakout.stop();
        Sound.play('second');
        this.play();
      }
    });
  }
}
