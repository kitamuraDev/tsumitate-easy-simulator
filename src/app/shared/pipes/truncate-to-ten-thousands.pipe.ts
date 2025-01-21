import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateToTenThousands',
  standalone: true,
})
export class TruncateToTenThousandsPipe implements PipeTransform {
  /**
   * 万の位以下を切り捨てて`toLocaleString`でフォーマットした文字列を返す
   *
   * @param amount 未フォーマット状態の金額（数値）
   * @returns フォーマットされた状態の金額（文字列）
   */
  transform(amount: number): string {
    const roundedDownToTenThousand = Math.floor(amount / 10000); // 万の位以下を切り捨て

    return roundedDownToTenThousand.toLocaleString();
  }
}
