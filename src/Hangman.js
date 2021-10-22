import React, { Component } from 'react';
import { randomWord } from './words';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [img0, img1, img2, img3, img4, img5, img6],
		rWord: randomWord(),
	};

	constructor(props) {
		super(props);
		this.state = { nWrong: 0, guessed: new Set(), answer: this.props.rWord };
		this.handleGuess = this.handleGuess.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer.split('').map((ltr) => (this.state.guessed.has(ltr) ? ltr : '_'));
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let ltr = evt.target.value;
		console.log(evt.target.value);
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong < 6 ? st.nWrong + (st.answer.includes(ltr) ? 0 : 1) : this.props.maxWrong,
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map((ltr) => (
			<button
				className='letter'
				key={ltr}
				value={ltr}
				onClick={this.handleGuess}
				disabled={this.state.guessed.has(ltr)}
			>
				{ltr}
			</button>
		));
	}

	handleClick() {
		this.setState((st) => ({
			guessed: new Set(),
			nWrong: 0,
			answer: this.props.rWord,
		}));
	}

	/** render: render game */
	render() {
		return (
			<div className='Hangman'>
				<h1>Hangman</h1>
				<img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} out of 6`} />
				<button onClick={this.handleClick} style={{ display: 'block' }} type='button' class='btn btn-warning'>
					Restart
				</button>
				<p>Number wrong: {this.state.nWrong}/6</p>
				{this.state.nWrong < 6 ? (
					<div>
						<p className='Hangman-word'>{this.guessedWord()}</p>
						<p className='Hangman-btns'>{this.generateButtons()}</p>
					</div>
				) : (
					<div>
						<p>You lost. Answer was: </p>
						<p className='Hangman-word'>{this.state.answer}</p>
					</div>
				)}
			</div>
		);
	}
}

export default Hangman;
