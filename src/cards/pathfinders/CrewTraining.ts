import {Player} from '../../Player';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tags} from '../Tags';
import {ICloneTagCard} from './ICloneTagCard';
import {DeclareCloneTag} from '../../pathfinders/DeclareCloneTag';
import {PathfindersExpansion} from '../../pathfinders/PathfindersExpansion';
import {Size} from '../render/Size';
import {played} from '../Options';

export class CrewTraining extends PreludeCard implements ICloneTagCard {
  constructor() {
    super({
      name: CardName.CREW_TRAINING,

      metadata: {
        cardNumber: 'P08',
        renderData: CardRenderer.builder((b) => {
          b.text('planetary track +2')
            .venus(1, {played}).or(Size.SMALL)
            .earth(1, {played}).or(Size.SMALL).br;
          b.mars(1, {played}).or(Size.SMALL)
            .jovian({amount: 1, played}).or(Size.SMALL)
            .moon(1, {played}).br;

          b.tr(2);
        }),
        description: 'Choose a planet tag. This card counts as having 2 of that tag. ' +
          'Raise the planetary influence track accordingly. Gain 2 TR.',
      },
    });
  }

  public cloneTag: Tags = Tags.CLONE;

  public get tags(): Array<Tags> {
    return [this.cloneTag, this.cloneTag];
  }

  public play(player: Player) {
    player.increaseTerraformRatingSteps(2);

    player.game.defer(
      new DeclareCloneTag(
        player,
        this,
        'Select a planetary track to advance 2 steps (and to clone this tag.)',
        (tag) => PathfindersExpansion.raiseTrack(tag, player, 2)));
    return undefined;
  }
}
