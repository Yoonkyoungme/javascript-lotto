import { ERROR_MESSAGES } from '../constants/messages.js';
import LOTTO_RULES from '../constants/lotto-rules.js';

const LottoPurchasePriceValidator = {
  validate(price) {
    this.validateDividedUnit(price);
  },

  isDividedUnit(price) {
    return price % LOTTO_RULES.lottoBaseTicketPrice === 0;
  },

  validateDividedUnit(price) {
    if (!this.isDividedUnit(price)) {
      throw new Error(
        `${ERROR_MESSAGES.prefix} ${ERROR_MESSAGES.invalidDividedUnit}`,
      );
    }
  },
};

export default LottoPurchasePriceValidator;
