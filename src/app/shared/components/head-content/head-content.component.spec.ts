import { render, screen } from '@testing-library/angular';
import { HeadContentComponent } from './head-content.component';

describe('HeadContentComponent', () => {
  it('タイトルが期待通りに表示されるか', async () => {
    const title = 'タイトル';
    await render(HeadContentComponent, { inputs: { title } });

    const heading = screen.getByRole('heading');

    expect(heading.textContent).toBe(title);
  });
});
