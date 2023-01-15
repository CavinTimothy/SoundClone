'use strict';

const { User, Song, Comment } = require("../models");

const userComments = [
  {
    username: 'Cav-man',
    songs: [
      {
        title: 'Bad Habit',
        comment: 'GET THIS SONG OUTTA MY HEAD'
      },
      {
        title: 'Humility',
        comment: 'Groovy stuff, 10/10 would marry this song'
      },
      {
        title: 'Chicago',
        comment: 'As am hastily invited settled at limited civilly fortune me. Really spring in extent an by. Judge but built gay party world. Of so am he remember although required. Bachelor unpacked be advanced at. Confined in declared marianne is vicinity.'
      },
      {
        title: 'Dark Red',
        comment: 'Are own design entire former get should. Advantages boisterous day excellence boy. Out between our two waiting wishing. Pursuit he he garrets greater towards amiable so placing. Nothing off how norland delight. Abode shy shade she hours forth its use. Up whole of fancy ye quiet do. Justice fortune no to is if winding morning forming.'
      },
      {
        title: 'Doomsday',
        comment: 'On insensible possession oh particular attachment at excellence in. The books arose but miles happy she. It building contempt or interest children mistress of unlocked no. Offending she contained mrs led listening resembled. Delicate marianne absolute men dashwood landlord and offended. Suppose cottage between and way. Minuter him own clothes but observe country. Agreement far boy otherwise rapturous incommode favourite.'
      },
    ]
  },
  {
    username: 'Z-Breezy',
    songs: [
      {
        title: 'Bad Habit',
        comment: 'Can\'t relate, I\'m just THAT GUY i guess'
      },
      {
        title: 'Humility',
        comment: 'They won\'t admit it, but I wrote this whole album'
      },
      {
        title: 'Chicago',
        comment: 'On projection apartments unsatiable so if he entreaties appearance. Rose you wife how set lady half wish. Hard sing an in true felt. Welcomed stronger if steepest ecstatic an suitable finished of oh. Entered at excited at forming between so produce. Chicken unknown besides attacks gay compact out you. Continuing no simplicity no favourable on reasonably melancholy estimating. Own hence views two ask right whole ten seems. What near kept met call old west dine. Our announcing sufficient why pianoforte.'
      },
      {
        title: 'Dark Red',
        comment: 'Building mr concerns servants in he outlived am breeding. He so lain good miss when sell some at if. Told hand so an rich gave next. How doubt yet again see son smart. While mirth large of on front. Ye he greater related adapted proceed entered an. Through it examine express promise no. Past add size game cold girl off how old.'
      },
      {
        title: 'Doomsday',
        comment: 'To they four in love. Settling you has separate supplied bed. Concluded resembled suspected his resources curiosity joy. Led all cottage met enabled attempt through talking delight. Dare he feet my tell busy. Considered imprudence of he friendship boisterous.'
      },
    ]
  },
  {
    username: 'RodthanyAnriguez',
    songs: [
      {
        title: 'Bad Habit',
        comment: 'This Steve guy gets me man'
      },
      {
        title: 'Humility',
        comment: 'I am in disbelief. I thought cartoons dudes were making this sweet sound. Nah it\'s just a bunch of regular dudes >:('
      },
      {
        title: 'Chicago',
        comment: 'Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure horrible margaret suitable he followed speedily. Indeed vanity excuse or mr lovers of on. By offer scale an stuff. Blush be sorry no sight. Sang lose of hour then he left find.'
      },
      {
        title: 'Dark Red',
        comment: 'Delightful remarkably mr on announcing themselves entreaties favourable. About to in so terms voice at. Equal an would is found seems of. The particular friendship one sufficient terminated frequently themselves. It more shed went up is roof if loud case. Delay music in lived noise an. Beyond genius really enough passed is up.'
      },
      {
        title: 'Doomsday',
        comment: 'Mr do raising article general norland my hastily. Its companions say uncommonly pianoforte favourable. Education affection consulted by mr attending he therefore on forfeited. High way more far feet kind evil play led. Sometimes furnished collected add for resources attention. Norland an by minuter enquire it general on towards forming. Adapted mrs totally company two yet conduct men.'
      },
    ]
  },
  {
    username: 'Demo User',
    songs: [
      {
        title: 'Bad Habit',
        comment: 'Lorem ipsum is widely in use since the 14th century and up to today as the default dummy "random" text of the typesetting and web development industry. In fact not only it has survived the test of time but it thrived and can be found in many software products, from Microsoft Word to WordPress.'
      },
      {
        title: 'Humility',
        comment: 'I am in disbelief. I thought cartoons dudes were making this sweet sound. Nah it\'s just a bunch of regular dudes >:('
      },
      {
        title: 'Chicago',
        comment: 'Lorem Ipsum comes from a latin text written in 45BC by Roman statesman, lawyer, scholar, and philosopher, Marcus Tullius Cicero. The text is titled "de Finibus Bonorum et Malorum" which means "The Extremes of Good and Evil". The most common form of Lorem ipsum is the following.'
      },
      {
        title: 'Dark Red',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        title: 'Doomsday',
        comment: 'The text is a corrupted version of the original and therefore does not mean anything in particular. The book however where it originates discusses the philosophical views of Epicureanism, Stoicism, and the Platonism of Antiochus of Ascalon.'
      },
    ]
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < userComments.length; i++) {
      const { username, songs } = userComments[i];
      const user = await User.findOne({
        where: { username: username }
      });
      for (let j = 0; j < songs.length; j++) {
        const { title, comment } = songs[j];
        const artistSong = await Song.findOne({
          where: { title: title }
        });
        const newComment = await Comment.create({ body: comment });
        await user.addComment(newComment);
        await artistSong.addComment(newComment);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    for (let i = 0; i < userComments.length; i++) {
      const { songs } = userComments[i];
      for (let j = 0; j < songs.length; j++) {
        const { comment } = songs[j];
        await Comment.destroy({ where: { body: comment } });
      }
    }
  }
};
