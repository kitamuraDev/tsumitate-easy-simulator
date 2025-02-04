import { DeferBlockState } from '@angular/core/testing';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TruncateToTenThousandsPipe } from '../../shared/pipes/truncate-to-ten-thousands.pipe';
import { CalculateService } from '../../shared/services/calculate.service';
import SimulationComponent from './simulation.component';

describe('SimulationComponent', () => {
  it('任意入力エリアがトグルされるか', async () => {
    const user = userEvent.setup();
    const { container } = await render(SimulationComponent);

    const toggleButton = container.querySelector('app-toggle-button button') as HTMLButtonElement;
    const anyInputsContainer = screen.getByTestId('any-inputs-container');

    // 任意入力エリアが非表示であること（初期表示時）
    expect(anyInputsContainer.classList).toContain('hidden');

    await user.click(toggleButton);
    expect(anyInputsContainer.classList).toContain('block');

    await user.click(toggleButton);
    expect(anyInputsContainer.classList).toContain('hidden');
  });

  describe('初期資産額', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let initialAssetInput: HTMLInputElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const iac = screen.getByTestId('initial-asset-container');
      decrementButton = iac.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = iac.querySelector('app-increment-button button') as HTMLButtonElement;
      initialAssetInput = screen.getByRole('spinbutton', { name: /初期資産額/ }) as HTMLInputElement;
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が0であることを確認
      expect(initialAssetInput.value).toBe('0');

      await user.click(incrementButton);
      expect(initialAssetInput.value).toBe('1');

      await user.click(decrementButton);
      expect(initialAssetInput.value).toBe('0');
    });

    it.each([
      { input: '', errorMessage: '必須項目です' },
      { input: '-1', errorMessage: '0以上の数値を入力してください' },
      { input: '1801', errorMessage: '1800以下の数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか', async ({ input, errorMessage }) => {
      await user.clear(initialAssetInput);
      if (input) await user.type(initialAssetInput, input); // `input === ''` の場合は `user.type()` を行わない

      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });

  describe('想定利回り', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let rateInput: HTMLInputElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const rc = screen.getByTestId('rate-container');
      decrementButton = rc.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = rc.querySelector('app-increment-button button') as HTMLButtonElement;
      rateInput = screen.getByRole('spinbutton', { name: /想定利回り/ }) as HTMLInputElement;
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が5であることを確認
      expect(rateInput.value).toBe('5');

      await user.click(incrementButton);
      expect(rateInput.value).toBe('6');

      await user.click(decrementButton);
      expect(rateInput.value).toBe('5');
    });

    it.each([
      { input: '', errorMessage: '必須項目です' },
      { input: '-1', errorMessage: '0以上の数値を入力してください' },
      { input: '21', errorMessage: '20以下の数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか', async ({ input, errorMessage }) => {
      await user.clear(rateInput);
      if (input) await user.type(rateInput, input);

      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });

  describe('毎月積立額', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let amountInput: HTMLInputElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const arc = screen.getByTestId('amount-required-container');
      decrementButton = arc.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = arc.querySelector('app-increment-button button') as HTMLButtonElement;
      amountInput = within(arc).getByRole('spinbutton', { name: /毎月積立額/ }) as HTMLInputElement;
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が3であることを確認
      expect(amountInput.value).toBe('3');

      await user.click(incrementButton);
      expect(amountInput.value).toBe('4');

      await user.click(decrementButton);
      expect(amountInput.value).toBe('3');
    });

    it.each([
      { input: '', errorMessage: '必須項目です' },
      { input: '0', errorMessage: '1以上の数値を入力してください' },
      { input: '31', errorMessage: '30以下の数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか', async ({ input, errorMessage }) => {
      await user.clear(amountInput);
      if (input) await user.type(amountInput, input);

      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });

  describe('積立期間', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let yearInput: HTMLInputElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const yrc = screen.getByTestId('year-required-container');
      decrementButton = yrc.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = yrc.querySelector('app-increment-button button') as HTMLButtonElement;
      yearInput = within(yrc).getByRole('spinbutton', { name: /積立期間/ }) as HTMLInputElement;
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が1であることを確認
      expect(yearInput.value).toBe('1');

      await user.click(incrementButton);
      expect(yearInput.value).toBe('2');

      await user.click(decrementButton);
      expect(yearInput.value).toBe('1');
    });

    it.each([
      { input: '', errorMessage: '必須項目です' },
      { input: '0', errorMessage: '1以上の数値を入力してください' },
      { input: '41', errorMessage: '40以下の数値を入力してください' },
      { input: '1.5', errorMessage: '整数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか', async ({ input, errorMessage }) => {
      await user.clear(yearInput);
      if (input) await user.type(yearInput, input);

      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });

  describe('毎月積立額（任意1）', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let amountInput: HTMLInputElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const aac = screen.getByTestId('amount-any-1-container');
      decrementButton = aac.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = aac.querySelector('app-increment-button button') as HTMLButtonElement;
      amountInput = within(aac).getByRole('spinbutton', { name: /毎月積立額/ }) as HTMLInputElement;
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が''であること
      expect(amountInput.value).toBe('');

      await user.dblClick(incrementButton);
      expect(amountInput.value).toBe('2');

      await user.click(decrementButton);
      expect(amountInput.value).toBe('1');
    });

    it.each([
      { input: '0', errorMessage: '1以上の数値を入力してください' },
      { input: '31', errorMessage: '30以下の数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか', async ({ input, errorMessage }) => {
      await user.clear(amountInput);
      await user.type(amountInput, input);

      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });

  describe('積立期間（任意1）', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let yearInput: HTMLInputElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const yac = screen.getByTestId('year-any-1-container');
      decrementButton = yac.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = yac.querySelector('app-increment-button button') as HTMLButtonElement;
      yearInput = within(yac).getByRole('spinbutton', { name: /積立期間/ }) as HTMLInputElement;
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が''であること
      expect(yearInput.value).toBe('');

      await user.dblClick(incrementButton);
      expect(yearInput.value).toBe('2');

      await user.click(decrementButton);
      expect(yearInput.value).toBe('1');
    });

    it.each([
      { input: '0', errorMessage: '1以上の数値を入力してください' },
      { input: '41', errorMessage: '40以下の数値を入力してください' },
      { input: '1.5', errorMessage: '整数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか', async ({ input, errorMessage }) => {
      await user.clear(yearInput);
      await user.type(yearInput, input);

      expect(screen.getByText(errorMessage)).toBeTruthy();
    });
  });

  // TODO: 現状の設定では`toBeDisabled()`が使えないので、以下のテストは使えるようになってから書く
  describe('計算ボタンの活性/非活性チェック', () => {});

  describe('最終評価額', () => {
    const { tsumitateEasyCalculate } = new CalculateService();
    const { transform } = new TruncateToTenThousandsPipe();

    it('初期表示時は、計算結果を表示するコンポーネントは非表示であるか', async () => {
      const { container } = await render(SimulationComponent);
      const displayAmountValueComponent = container.querySelector('app-display-amount-value');

      expect(displayAmountValueComponent).toBeFalsy();
    });

    /**
     * TODO: 本当な複数パターンをテストしたい
     *  - Dexie.js関連のエラーが2つ目以降のテストで発生してしまう（理由は分からない）ため、一旦は以下のテストだけに留める
     *  - 計算ロジックはサービスのテストで問題がないことを担保しているため、コンポーネントテストでは、「計算結果が画面に問題なく表示される」ことだけを担保する
     */
    it('「計算」ボタンを押下で、計算結果が表示されるか', async () => {
      const user = userEvent.setup();
      const { renderDeferBlock } = await render(SimulationComponent);

      const iac = within(screen.getByTestId('initial-asset-container'));
      const initialAsset = Number((iac.getByRole('spinbutton', { name: /初期資産額/ }) as HTMLInputElement).value);
      const rc = within(screen.getByTestId('rate-container'));
      const rate = Number((rc.getByRole('spinbutton', { name: /想定利回り/ }) as HTMLInputElement).value);
      const arc = within(screen.getByTestId('amount-required-container'));
      const amount = Number((arc.getByRole('spinbutton', { name: /毎月積立額/ }) as HTMLInputElement).value);
      const yrc = within(screen.getByTestId('year-required-container'));
      const year = Number((yrc.getByRole('spinbutton', { name: /積立期間/ }) as HTMLInputElement).value);

      const calcResult = tsumitateEasyCalculate({ initialAsset, amounts: [amount], years: [year], rate });
      const expectedCalcResult = transform(calcResult.compoundInterestCalcResult);

      // 計算ボタン押下
      await user.click(screen.getByRole('button', { name: /計算/ }));

      // 計算ボタン押下後、値が0から更新されるのを契機に、`DisplayAmountValueComponent`が初めて表示されるため、`DeferBlockState.Complete`とする
      await renderDeferBlock(DeferBlockState.Complete);
      expect(await screen.findByText(expectedCalcResult)).toBeTruthy();
    });
  });
});
