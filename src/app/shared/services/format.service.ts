import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  /**
   * 万の位以下を切り捨てて`toLocaleString`でフォーマットした文字列を返す
   *
   * @param amount 未フォーマット状態の金額（数値）
   * @returns フォーマットされた状態の金額（文字列）
   */
  formatAmountToTenThousand(amount: number): string {
    const roundedDownToTenThousand = Math.floor(amount / 10000); // 万の位以下を切り捨て

    return roundedDownToTenThousand.toLocaleString();
  }
}
