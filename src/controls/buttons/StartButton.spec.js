import React from "react"
import StartButton from "./StartButton"
import { render, fireEvent, screen } from '@testing-library/react'

test('loads items eventually', async () => {
  render(<Page />)

  // Click button
  fireEvent.click(getByText('Load'))

  // Wait for page to update with query text
  const items = await screen.findAllByText(/Item #[0-9]: /)
  expect(items).toHaveLength(10)
})
import {render, screen} from '@testing-library/react'
it("disables the StartButton after starting the game",()=>{
const button = screen.getByRole('button', {name: /disabled button/i})

// ✅
expect(button).toBeDisabled()
// error message:
//   Received element is not disabled:
//     <button />

}
