import '@testing-library/jest-dom';
import { DeferBlockState } from '@angular/core/testing';
import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SettingDatabaseService } from '../../core/setting-database.service';
import { TruncateToTenThousandsPipe } from '../../shared/pipes/truncate-to-ten-thousands.pipe';
import { CalculateService } from '../../shared/services/calculate.service';
import SimulationComponent from './simulation.component';

describe('SimulationComponent', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // ng-iconのエラーを無視
  });

  it('任意入力エリアがトグルされるか', async () => {
    const user = userEvent.setup();
    const { container } = await render(SimulationComponent);

    const toggleButton = container.querySelector('app-toggle-button button') as HTMLButtonElement;
    const anyInputsContainer = screen.getByTestId('any-inputs-container');

    // 任意入力エリアが非表示であること（初期表示時）
    expect(anyInputsContainer).toHaveClass('hidden');

    await user.click(toggleButton);
    expect(anyInputsContainer).toHaveClass('block');

    await user.click(toggleButton);
    expect(anyInputsContainer).toHaveClass('hidden');
  });

  describe('初期資産額', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let initialAssetInput: HTMLInputElement;
    let calcButton: HTMLButtonElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const iac = screen.getByTestId('initial-asset-container');
      decrementButton = iac.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = iac.querySelector('app-increment-button button') as HTMLButtonElement;
      initialAssetInput = screen.getByRole('spinbutton', { name: /初期資産額/ }) as HTMLInputElement;
      calcButton = screen.getByTestId('calculate-button');
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が0であることを確認
      expect(initialAssetInput.value).toBe('0');

      await user.click(incrementButton);
      expect(initialAssetInput.value).toBe('1');

      await user.click(decrementButton);
      expect(initialAssetInput.value).toBe('0');
    });

    // biome-ignore format: off
    it.each([
      { input: '', errorMessage: '必須項目です' },
      { input: '-1', errorMessage: '0以上の数値を入力してください' },
      { input: '1801', errorMessage: '1800以下の数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか。また、計算ボタンの活性/非活性がバリデーション状態に応じて切り替わるか', async ({ input, errorMessage }) => {
      expect(calcButton).toBeEnabled();

      await user.clear(initialAssetInput);
      if (input) await user.type(initialAssetInput, input); // `input === ''` の場合は `user.type()` を行わない

      expect(screen.getByText(errorMessage)).toBeVisible();
      expect(calcButton).toBeDisabled();

      await user.clear(initialAssetInput);
      await user.type(initialAssetInput, '0'); // 正常な入力に戻す

      expect(calcButton).toBeEnabled();
    });
  });

  describe('想定利回り', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let rateInput: HTMLInputElement;
    let calcButton: HTMLButtonElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const rc = screen.getByTestId('rate-container');
      decrementButton = rc.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = rc.querySelector('app-increment-button button') as HTMLButtonElement;
      rateInput = screen.getByRole('spinbutton', { name: /想定利回り/ }) as HTMLInputElement;
      calcButton = screen.getByTestId('calculate-button');
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が5であることを確認
      expect(rateInput.value).toBe('5');

      await user.click(incrementButton);
      expect(rateInput.value).toBe('6');

      await user.click(decrementButton);
      expect(rateInput.value).toBe('5');
    });

    // biome-ignore format: off
    it.each([
      { input: '', errorMessage: '必須項目です' },
      { input: '-1', errorMessage: '0以上の数値を入力してください' },
      { input: '21', errorMessage: '20以下の数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか。また、計算ボタンの活性/非活性がバリデーション状態に応じて切り替わるか', async ({ input, errorMessage }) => {
      expect(calcButton).toBeEnabled();

      await user.clear(rateInput);
      if (input) await user.type(rateInput, input);

      expect(screen.getByText(errorMessage)).toBeVisible();
      expect(calcButton).toBeDisabled();

      await user.clear(rateInput);
      await user.type(rateInput, '5'); // 正常な入力に戻す

      expect(calcButton).toBeEnabled();
    });
  });

  describe('毎月積立額', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let amountInput: HTMLInputElement;
    let calcButton: HTMLButtonElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const arc = screen.getByTestId('amount-required-container');
      decrementButton = arc.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = arc.querySelector('app-increment-button button') as HTMLButtonElement;
      amountInput = within(arc).getByRole('spinbutton', { name: /毎月積立額/ }) as HTMLInputElement;
      calcButton = screen.getByTestId('calculate-button');
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が3であることを確認
      expect(amountInput.value).toBe('3');

      await user.click(incrementButton);
      expect(amountInput.value).toBe('4');

      await user.click(decrementButton);
      expect(amountInput.value).toBe('3');
    });

    // biome-ignore format: off
    it.each([
      { input: '', errorMessage: '必須項目です' },
      { input: '0', errorMessage: '1以上の数値を入力してください' },
      { input: '31', errorMessage: '30以下の数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか。また、計算ボタンの活性/非活性がバリデーション状態に応じて切り替わるか', async ({ input, errorMessage }) => {
      expect(calcButton).toBeEnabled();

      await user.clear(amountInput);
      if (input) await user.type(amountInput, input);

      expect(screen.getByText(errorMessage)).toBeVisible();
      expect(calcButton).toBeDisabled();

      await user.clear(amountInput);
      await user.type(amountInput, '3'); // 正常な入力に戻す

      expect(calcButton).toBeEnabled();
    });
  });

  describe('積立期間', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let yearInput: HTMLInputElement;
    let calcButton: HTMLButtonElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const yrc = screen.getByTestId('year-required-container');
      decrementButton = yrc.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = yrc.querySelector('app-increment-button button') as HTMLButtonElement;
      yearInput = within(yrc).getByRole('spinbutton', { name: /積立期間/ }) as HTMLInputElement;
      calcButton = screen.getByTestId('calculate-button');
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が1であることを確認
      expect(yearInput.value).toBe('1');

      await user.click(incrementButton);
      expect(yearInput.value).toBe('2');

      await user.click(decrementButton);
      expect(yearInput.value).toBe('1');
    });

    // biome-ignore format: off
    it.each([
      { input: '', errorMessage: '必須項目です' },
      { input: '0', errorMessage: '1以上の数値を入力してください' },
      { input: '41', errorMessage: '40以下の数値を入力してください' },
      { input: '1.5', errorMessage: '整数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか。また、計算ボタンの活性/非活性がバリデーション状態に応じて切り替わるか', async ({ input, errorMessage }) => {
      expect(calcButton).toBeEnabled();

      await user.clear(yearInput);
      if (input) await user.type(yearInput, input);

      expect(screen.getByText(errorMessage)).toBeVisible();
      expect(calcButton).toBeDisabled();

      await user.clear(yearInput);
      await user.type(yearInput, '1'); // 正常な入力に戻す

      expect(calcButton).toBeEnabled();
    });
  });

  describe('毎月積立額（任意1）', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let amountInput: HTMLInputElement;
    let calcButton: HTMLButtonElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const aac = screen.getByTestId('amount-any-1-container');
      decrementButton = aac.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = aac.querySelector('app-increment-button button') as HTMLButtonElement;
      amountInput = within(aac).getByRole('spinbutton', { name: /毎月積立額/ }) as HTMLInputElement;
      calcButton = screen.getByTestId('calculate-button');
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が''であること
      expect(amountInput.value).toBe('');

      await user.dblClick(incrementButton);
      expect(amountInput.value).toBe('2');

      await user.click(decrementButton);
      expect(amountInput.value).toBe('1');
    });

    // biome-ignore format: off
    it.each([
      { input: '0', errorMessage: '1以上の数値を入力してください' },
      { input: '31', errorMessage: '30以下の数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか。また、計算ボタンの活性/非活性がバリデーション状態に応じて切り替わるか', async ({ input, errorMessage }) => {
      expect(calcButton).toBeEnabled();

      await user.clear(amountInput);
      await user.type(amountInput, input);
      expect(screen.getByText(errorMessage)).toBeVisible();
      expect(calcButton).toBeDisabled();

      await user.clear(amountInput);
      expect(calcButton).toBeEnabled();
    });
  });

  describe('積立期間（任意1）', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let decrementButton: HTMLButtonElement;
    let incrementButton: HTMLButtonElement;
    let yearInput: HTMLInputElement;
    let calcButton: HTMLButtonElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      const yac = screen.getByTestId('year-any-1-container');
      decrementButton = yac.querySelector('app-decrement-button button') as HTMLButtonElement;
      incrementButton = yac.querySelector('app-increment-button button') as HTMLButtonElement;
      yearInput = within(yac).getByRole('spinbutton', { name: /積立期間/ }) as HTMLInputElement;
      calcButton = screen.getByTestId('calculate-button');
    });

    it('インクリメント/デクリメントが正常に行えるか', async () => {
      // 初期値が''であること
      expect(yearInput.value).toBe('');

      await user.dblClick(incrementButton);
      expect(yearInput.value).toBe('2');

      await user.click(decrementButton);
      expect(yearInput.value).toBe('1');
    });

    // biome-ignore format: off
    it.each([
      { input: '0', errorMessage: '1以上の数値を入力してください' },
      { input: '41', errorMessage: '40以下の数値を入力してください' },
      { input: '1.5', errorMessage: '整数値を入力してください' },
    ])('入力に対するバリデーションエラーメッセージが表示されるか。また、計算ボタンの活性/非活性がバリデーション状態に応じて切り替わるか', async ({ input, errorMessage }) => {
      expect(calcButton).toBeEnabled();

      await user.clear(yearInput);
      await user.type(yearInput, input);
      expect(screen.getByText(errorMessage)).toBeVisible();
      expect(calcButton).toBeDisabled();

      await user.clear(yearInput);
      expect(calcButton).toBeEnabled();
    });
  });

  describe('計算ボタンの活性/非活性チェック', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let calcButton: HTMLButtonElement;
    let initialAssetInput: HTMLInputElement;
    let rateInput: HTMLInputElement;
    let amountRequiredInput: HTMLInputElement;
    let yearRequiredInput: HTMLInputElement;
    let amountAny1Input: HTMLInputElement;
    let yearAny1Input: HTMLInputElement;
    let amountAny3Input: HTMLInputElement;
    let yearAny3Input: HTMLInputElement;

    beforeEach(async () => {
      user = userEvent.setup();
      await render(SimulationComponent);

      calcButton = screen.getByTestId('calculate-button');
      initialAssetInput = screen.getByRole('spinbutton', { name: /初期資産額/ });
      rateInput = screen.getByRole('spinbutton', { name: /想定利回り/ });
      amountRequiredInput = within(screen.getByTestId('amount-required-container')).getByRole('spinbutton', {
        name: /毎月積立額/,
      });
      yearRequiredInput = within(screen.getByTestId('year-required-container')).getByRole('spinbutton', {
        name: /積立期間/,
      });
      amountAny1Input = within(screen.getByTestId('amount-any-1-container')).getByRole('spinbutton', {
        name: /毎月積立額/,
      });
      yearAny1Input = within(screen.getByTestId('year-any-1-container')).getByRole('spinbutton', {
        name: /積立期間/,
      });
      amountAny3Input = within(screen.getByTestId('amount-any-3-container')).getByRole('spinbutton', {
        name: /毎月積立額/,
      });
      yearAny3Input = within(screen.getByTestId('year-any-3-container')).getByRole('spinbutton', {
        name: /積立期間/,
      });
    });

    it('初期表示時はバリデーションエラーは発生しないため、計算ボタンは活性であるか', async () => {
      expect(calcButton).toBeEnabled();
    });

    it('各入力項目の状態に応じて、計算ボタンの活性/非活性が切り替わるか', async () => {
      expect(calcButton).toBeEnabled();

      // 必須入力の項目をバリデーションエラー状態にする
      await user.clear(initialAssetInput);
      await user.clear(rateInput);
      await user.clear(amountRequiredInput);
      await user.clear(yearRequiredInput);

      expect(calcButton).toBeDisabled();

      // 正常な入力に戻す
      await user.type(initialAssetInput, '0');
      await user.type(rateInput, '5');
      await user.type(amountRequiredInput, '3');
      await user.type(yearRequiredInput, '1');

      expect(calcButton).toBeEnabled();

      // 任意入力の項目をバリデーションエラー状態にする
      await user.type(amountAny1Input, '0');
      await user.type(yearAny1Input, '0');
      await user.type(amountAny3Input, '0');
      await user.type(yearAny3Input, '0');

      expect(calcButton).toBeDisabled();

      // "一部"正常な入力に戻す
      await user.clear(amountAny1Input);
      await user.clear(yearAny1Input);

      expect(calcButton).toBeDisabled();

      // すべての項目を正常な入力に戻す
      await user.clear(amountAny3Input);
      await user.clear(yearAny3Input);

      expect(calcButton).toBeEnabled();
    });

    it('片方のみの入力の場合、計算ボタンが非活性になるか', async () => {
      expect(calcButton).toBeEnabled();

      await user.type(amountAny1Input, '5');
      expect(calcButton).toBeDisabled(); // 片方

      await user.type(yearAny1Input, '5');
      expect(calcButton).toBeEnabled(); // 両方

      await user.type(amountAny3Input, '5');
      expect(calcButton).toBeDisabled(); // 片方

      await user.clear(amountAny1Input);
      expect(calcButton).toBeDisabled(); // 片方

      await user.type(yearAny3Input, '5');
      expect(calcButton).toBeDisabled(); // 片方

      await user.type(amountAny1Input, '5');
      expect(calcButton).toBeEnabled(); // 両方
    });
  });

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
     *  - （2025/4/4追記）providersでDexie.jsを呼び出す箇所をモックすればDexie.js固有のエラーは回避できることが分かったため、後で他のテストケースも追加する
     */
    it('「計算」ボタンを押下で、計算結果が表示されるか', async () => {
      const user = userEvent.setup();
      const { renderDeferBlock } = await render(SimulationComponent, {
        providers: [
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: false,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });

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
      await user.click(screen.getByTestId('calculate-button'));

      // 計算ボタン押下後、値が0から更新されるのを契機に、`DisplayAmountValueComponent`が初めて表示されるため、`DeferBlockState.Complete`とする
      await renderDeferBlock(DeferBlockState.Complete);
      expect(await screen.findByText(expectedCalcResult)).toBeVisible();
    });
  });

  describe('adjustForNoInvestmentPeriod()', () => {
    it('積立無しの期間を含めない設定にしている場合は、元の配列が返却されるか', async () => {
      const { fixture } = await render(SimulationComponent, {
        providers: [
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: false,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });
      const component = fixture.componentInstance;

      const amounts = [1, 2, 3];
      const years = [1, 2, 3];
      const result = await component['adjustForNoInvestmentPeriod'](amounts, years);

      expect(result).toEqual({ amounts, years });
    });

    it('積立無しの期間を含める設定にしている場合は、元の配列に積立無しの期間を追加した配列が返却されるか', async () => {
      const { fixture } = await render(SimulationComponent, {
        providers: [
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });
      const component = fixture.componentInstance;

      const amounts = [1, 2, 3];
      const years = [1, 2, 3]; // 運用終了年齢を超えない積立年数（65 - 25 - 1 - 2 - 3 ... 34となる）
      const result = await component['adjustForNoInvestmentPeriod'](amounts, years);

      expect(result).toEqual({ amounts: [1, 2, 3, 0], years: [1, 2, 3, 34] });
    });

    it('積立無しの期間が0未満の場合は、元の配列が返却されるか', async () => {
      const { fixture } = await render(SimulationComponent, {
        providers: [
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });
      const component = fixture.componentInstance;

      const amounts = [1, 2, 3];
      const years = [10, 20, 30]; // 運用終了年齢を超える積立年数（65 - 25 - 10 - 20 - 30 ... 0未満となる）
      const result = await component['adjustForNoInvestmentPeriod'](amounts, years);

      expect(result).toEqual({ amounts, years });
    });

    it('積立無しの期間が0の場合は、元の配列が返却されるか', async () => {
      const { fixture } = await render(SimulationComponent, {
        providers: [
          {
            provide: SettingDatabaseService,
            useValue: {
              getNoInvestmentPeriodIncluded: () =>
                Promise.resolve({
                  isNoInvestmentPeriodIncluded: true,
                  selectedCurrentAge: '25',
                  selectedEndAge: '65',
                }),
            },
          },
        ],
      });
      const component = fixture.componentInstance;

      const amounts = [1, 2, 3];
      const years = [10, 20, 10]; // 運用終了年齢と差引0の積立年数（65 - 25 - 10 - 20 - 10 ... 0）
      const result = await component['adjustForNoInvestmentPeriod'](amounts, years);

      expect(result).toEqual({ amounts, years });
    });
  });
});
