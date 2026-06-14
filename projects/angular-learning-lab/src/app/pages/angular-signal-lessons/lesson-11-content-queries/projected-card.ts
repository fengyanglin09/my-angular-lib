import { Component, ElementRef, computed, contentChild, contentChildren } from '@angular/core';

import { ProjectedAction } from './projected-action';
import { ProjectedTitle } from './projected-title';

@Component({
  selector: 'app-projected-card',
  templateUrl: './projected-card.html',
  styleUrl: './projected-card.css',
})
export class ProjectedCard {
  protected readonly projectedTitle = contentChild(ProjectedTitle);
  protected readonly projectedTitleElement = contentChild<
    ProjectedTitle,
    ElementRef<HTMLHeadingElement>
  >(ProjectedTitle, {
    read: ElementRef,
  });
  protected readonly projectedActions = contentChildren(ProjectedAction);

  protected readonly projectedTitleText = computed(
    () => this.projectedTitle()?.titleLabel() || 'No projected title',
  );
  protected readonly projectedTitleElementDescription = computed(() => {
    const titleElement = this.projectedTitleElement()?.nativeElement;

    if (!titleElement) {
      return 'No h3 element found';
    }

    return `<${titleElement.tagName.toLowerCase()}> host element`;
  });
  protected readonly actionLabels = computed(() =>
    this.projectedActions().map((action) => action.actionLabel()),
  );
}
