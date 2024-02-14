import { COLORS } from './constants.ts'

export type Color = typeof COLORS[number]

export type Grid  ={
  tiles: Color[]
  versionstamps: string[]
}