import {PM} from '../type';

export default interface ICreateOption{
  pm: PM
  force: boolean
  merge: boolean
  gitPath?: string
}
