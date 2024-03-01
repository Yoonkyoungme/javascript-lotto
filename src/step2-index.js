/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import './styles/index.css';
import { $, $$ } from './utils/dom';

import LottoGenerate from './domains/LottoGenerator';
import LottoCalculator from './domains/LottoCalculator';

import LottoValidator from './validators/LottoValidator';

import { createWebWinningResult } from './utils/createWinningResult';

import LOTTO_RULES from './constants/lotto-rules';
import LOTTO_STATISTICS from './constants/lotto-statistics';
import { WEB_MESSAGES } from './constants/messages';

// 티켓 구입, 로또 발행
const $lottoPurchaseForm = $('#lotto-purchase-form');

let ticketCount;
let generatedLottos;

$lottoPurchaseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const $lottoPurchaseInput = $('#lotto-purchase-input');
  const purchasePrice = $lottoPurchaseInput.value;

  /**
   * <고민>
   * 구입 버튼을 누르기 전에 html input 태그의 step 속성으로 1,000원 단위의 입력인지 검증이 가능하다.
   * 또한 number type, min, max 값도 검증이 가능하다.
   * → LottoPurchasePriceValidator를 사용해야 할까? 태그의 속성을 잘 활용하는 것이 더 좋은 방법이 아닐까?
   */

  ticketCount = getTicketCount(purchasePrice);

  if (ticketCount) {
    const $$hiddenForm = $$('.hidden-form');

    const $totalTicketCount = $('#total-ticket-count');
    $totalTicketCount.textContent = printTicketCount(ticketCount);

    const $generatedLottoContents = $('#generated-lotto-contents');

    // 구매한 로또 티켓을 출력하는 기능
    const lottoGenerate = new LottoGenerate(ticketCount);
    generatedLottos = lottoGenerate.generatedLottos;
    $generatedLottoContents.innerHTML = printGeneratedLottos(generatedLottos);
  }
});

// LottoController에 정의되어 있음
function getTicketCount(lottoPurchasePrice) {
  return lottoPurchasePrice / LOTTO_RULES.lottoBaseTicketPrice;
}

// 출력
function printTicketCount(count) {
  return WEB_MESSAGES.ticketCount(count);
}

function printGeneratedLottos(generatedLottos) {
  return generatedLottos
    .map((lotto) => {
      return `<li>${WEB_MESSAGES.ticketEmoji} ${lotto.join(', ')}</li>`;
    })
    .join('');
}
