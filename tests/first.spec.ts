/// <reference types="node" />
import { test, expect } from '../fixtures/auth'

test('This is the first test to check CICD', async ({ authenticatedPage  }) => {

  await expect(authenticatedPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

});
  