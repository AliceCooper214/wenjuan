import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer'

function isActiveElementValid() {
  const activeElem = document.activeElement

  if (activeElem === document.body) return true
  if (activeElem?.matches('div[role="button"]')) return true

  return false
}

export default function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )

  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(UndoActionCreators.redo())
  })
}
