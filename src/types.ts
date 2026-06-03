/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VocabItem {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
}

export interface StoryPage {
  pageNumber: number;
  englishText: string;
  vietnameseText: string;
  svgCode: string;
  vocabulary: VocabItem[];
}

export interface Story {
  title: string;
  titleVi: string;
  coverSvg: string;
  pages: StoryPage[];
}
