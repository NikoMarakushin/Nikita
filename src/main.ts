import './style.css'

const cards = document.querySelectorAll('.memory-card') as NodeListOf<HTMLDivElement>
const startGame = document.querySelector('#startGame') as HTMLButtonElement
const cardsSvg = [
  'club_1', 'club_2', 'club_3', 'club_4', 'club_5', 'club_6', 'club_7', 'club_8', 'club_9', 'club_10', 'club_jack', 'club_king', 'club_queen',
  'diamond_1', 'diamond_2', 'diamond_3', 'diamond_4', 'diamond_5', 'diamond_6', 'diamond_7', 'diamond_8', 'diamond_9', 'diamond_10', 'diamond_jack', 'diamond_king', 'diamond_queen',
  'heart_1', 'heart_2', 'heart_3', 'heart_4', 'heart_5', 'heart_6', 'heart_7', 'heart_8', 'heart_9', 'heart_10', 'heart_jack', 'heart_king', 'heart_queen',
  'spade_1', 'spade_2', 'spade_3', 'spade_4', 'spade_5', 'spade_6', 'spade_7', 'spade_8', 'spade_9', 'spade_10', 'spade_jack', 'spade_king', 'spade_queen',
  'joker_black', 'joker_red'
] 
const shuffleArray = (array:any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

let isGameRun = false
let showPause = false
let card1: Element|undefined
let card2: Element|undefined

document.body.addEventListener('click', (e:MouseEvent) => {

  if (e.target == startGame) {
    isGameRun = !isGameRun
    if (isGameRun) {
      startGame.textContent = 'Закончить'
      shuffleArray(cardsSvg)
      const collection = [...cardsSvg.slice(0, 5), ...cardsSvg.slice(0, 5)]
      shuffleArray(collection)
      cards.forEach((el,i) => {
        (el.querySelector('.front-face') as HTMLImageElement).src = 'images/' + collection[i]+'.png'   
      })
    } else {
      startGame.textContent = 'Новая игра'
      cards.forEach(el => {
        el.classList.remove('flip')
      })
    }
  }

  const card = (e.target as HTMLElement).closest('.memory-card')
  
  if (card && isGameRun && !showPause) {
    card.classList.toggle('flip')
    if (card.classList.contains('flip')) {
      if (!card1) {
        card1 = card
      } else {
        card2 = card
      }
      if (card1 && card2) {
        // check value
        if ((card1.querySelector('.front-face') as HTMLImageElement).src == (card2.querySelector('.front-face') as HTMLImageElement).src) {
          // if same value clear cards
          console.log('true')
          card1 = card2 = undefined
        } else {
          console.log('false')
          // if not same -> clear cards and toggle flip
          showPause = true
          setTimeout(()=>{
            showPause = false            
            card1?.classList.toggle('flip')
            card2?.classList.toggle('flip')
            card1 = card2 = undefined
          },3000)
        }
      }
    }
  }
})

