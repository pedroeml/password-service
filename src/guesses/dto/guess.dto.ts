export class GuessDto {
  readonly id?: string;
  readonly guess?: string;
  readonly gameId?: string;
  readonly ownerUserId?: string;
  readonly correctChars?: number;
  readonly misplacedChars?: number;
}
