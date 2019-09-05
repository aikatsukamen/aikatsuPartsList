/** パーツ情報 */
export type Parts = {
  /** パーツ名 */
  name: string;
  /** 部位 */
  category: string;
  /** パーツ画像 */
  image: string;
  /** 装着例 */
  example: string;
  /** 初出バージョン */
  version: string;
  /** アニメキャラパーツか */
  animeChara: string;
  /** スターズ入手手段 */
  stars: Availability,
  /** フレンズ入手手段 */
  friends: Availability
  /** パレード入手手段 */
  parade: Availability
  /** QRコード */
  qr: string;
}
type Availability = {
  /** タイプレベル */
  level: string;
  /** ゲーム内イベント、オフィショなど */
  event: string;
  /** ランキング報酬 */
  ranking: string;
  /** ファンブック、グミ等 */
  book: string;
}
