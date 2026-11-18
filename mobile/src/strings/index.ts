/**
 * The one place screens get their words from:
 *
 *   import { strings } from '@/strings';
 *   <Text>{strings.family.title}</Text>
 *
 * Right now this is English only. When Spanish arrives, this file is the
 * only one that changes: it will pick English or Spanish, and every
 * screen keeps working as written.
 */
import { en } from './en';

export const strings = en;
