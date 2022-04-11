import { WebApplication } from '@/ui_models/application';
import {
  CollectionSort,
  CollectionSortProperty,
  PrefKey,
} from '@standardnotes/snjs';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Icon } from './Icon';
import { Menu } from './Menu/Menu';
import { MenuItem, MenuItemSeparator, MenuItemType } from './Menu/MenuItem';

type Props = {
  application: WebApplication;
  closeOnBlur: (event: { relatedTarget: EventTarget | null }) => void;
  closeDisplayOptionsMenu: () => void;
  isOpen: boolean;
};

export const NotesListOptionsMenu: FunctionComponent<Props> = observer(
  ({ closeDisplayOptionsMenu, closeOnBlur, application, isOpen }) => {
    const [sortBy, setSortBy] = useState(() =>
      application.getPreference(PrefKey.SortNotesBy, CollectionSort.CreatedAt)
    );
    const [sortReverse, setSortReverse] = useState(() =>
      application.getPreference(PrefKey.SortNotesReverse, false)
    );
    const [hidePreview, setHidePreview] = useState(() =>
      application.getPreference(PrefKey.NotesHideNotePreview, false)
    );
    const [hideDate, setHideDate] = useState(() =>
      application.getPreference(PrefKey.NotesHideDate, false)
    );
    const [hideTags, setHideTags] = useState(() =>
      application.getPreference(PrefKey.NotesHideTags, true)
    );
    const [hidePinned, setHidePinned] = useState(() =>
      application.getPreference(PrefKey.NotesHidePinned, false)
    );
    const [showArchived, setShowArchived] = useState(() =>
      application.getPreference(PrefKey.NotesShowArchived, false)
    );
    const [showTrashed, setShowTrashed] = useState(() =>
      application.getPreference(PrefKey.NotesShowTrashed, false)
    );
    const [hideProtected, setHideProtected] = useState(() =>
      application.getPreference(PrefKey.NotesHideProtected, false)
    );
    const [hideEditorIcon, setHideEditorIcon] = useState(() =>
      application.getPreference(PrefKey.NotesHideEditorIcon, false)
    );

    const toggleSortReverse = () => {
      application.setPreference(PrefKey.SortNotesReverse, !sortReverse);
      setSortReverse(!sortReverse);
    };

    const toggleSortBy = (sort: CollectionSortProperty) => {
      if (sortBy === sort) {
        toggleSortReverse();
      } else {
        setSortBy(sort);
        application.setPreference(PrefKey.SortNotesBy, sort);
      }
    };

    const toggleSortByDateModified = () => {
      toggleSortBy(CollectionSort.UpdatedAt);
    };

    const toggleSortByCreationDate = () => {
      toggleSortBy(CollectionSort.CreatedAt);
    };

    const toggleSortByTitle = () => {
      toggleSortBy(CollectionSort.Title);
    };

    const toggleHidePreview = () => {
      setHidePreview(!hidePreview);
      application.setPreference(PrefKey.NotesHideNotePreview, !hidePreview);
    };

    const toggleHideDate = () => {
      setHideDate(!hideDate);
      application.setPreference(PrefKey.NotesHideDate, !hideDate);
    };

    const toggleHideTags = () => {
      setHideTags(!hideTags);
      application.setPreference(PrefKey.NotesHideTags, !hideTags);
    };

    const toggleHidePinned = () => {
      setHidePinned(!hidePinned);
      application.setPreference(PrefKey.NotesHidePinned, !hidePinned);
    };

    const toggleShowArchived = () => {
      setShowArchived(!showArchived);
      application.setPreference(PrefKey.NotesShowArchived, !showArchived);
    };

    const toggleShowTrashed = () => {
      setShowTrashed(!showTrashed);
      application.setPreference(PrefKey.NotesShowTrashed, !showTrashed);
    };

    const toggleHideProtected = () => {
      setHideProtected(!hideProtected);
      application.setPreference(PrefKey.NotesHideProtected, !hideProtected);
    };

    const toggleEditorIcon = () => {
      setHideEditorIcon(!hideEditorIcon);
      application.setPreference(PrefKey.NotesHideEditorIcon, !hideEditorIcon);
    };

    return (
      <Menu
        className={
          'sn-dropdown sn-dropdown--animated min-w-70 overflow-y-auto \
        border-1 border-solid border-main text-sm z-index-dropdown-menu \
        flex flex-col py-2 top-full left-2 absolute'
        }
        a11yLabel="Notes list options menu"
        closeMenu={closeDisplayOptionsMenu}
        isOpen={isOpen}
      >
        <div className="px-3 my-1 text-xs font-semibold color-text uppercase">
          Sort by
        </div>
        <MenuItem
          className="py-2"
          type={MenuItemType.RadioButton}
          onClick={toggleSortByDateModified}
          checked={sortBy === CollectionSort.UpdatedAt}
          onBlur={closeOnBlur}
        >
          <div className="flex flex-grow items-center justify-between">
            <span>Date modified</span>
            {sortBy === CollectionSort.UpdatedAt ? (
              sortReverse ? (
                <Icon type="arrows-sort-up" className="color-neutral" />
              ) : (
                <Icon type="arrows-sort-down" className="color-neutral" />
              )
            ) : null}
          </div>
        </MenuItem>
        <MenuItem
          className="py-2"
          type={MenuItemType.RadioButton}
          onClick={toggleSortByCreationDate}
          checked={sortBy === CollectionSort.CreatedAt}
          onBlur={closeOnBlur}
        >
          <div className="flex flex-grow items-center justify-between">
            <span>Creation date</span>
            {sortBy === CollectionSort.CreatedAt ? (
              sortReverse ? (
                <Icon type="arrows-sort-up" className="color-neutral" />
              ) : (
                <Icon type="arrows-sort-down" className="color-neutral" />
              )
            ) : null}
          </div>
        </MenuItem>
        <MenuItem
          className="py-2"
          type={MenuItemType.RadioButton}
          onClick={toggleSortByTitle}
          checked={sortBy === CollectionSort.Title}
          onBlur={closeOnBlur}
        >
          <div className="flex flex-grow items-center justify-between">
            <span>Title</span>
            {sortBy === CollectionSort.Title ? (
              sortReverse ? (
                <Icon type="arrows-sort-up" className="color-neutral" />
              ) : (
                <Icon type="arrows-sort-down" className="color-neutral" />
              )
            ) : null}
          </div>
        </MenuItem>
        <MenuItemSeparator />
        <div className="px-3 py-1 text-xs font-semibold color-text uppercase">
          View
        </div>
        <MenuItem
          type={MenuItemType.SwitchButton}
          className="py-1 hover:bg-contrast focus:bg-info-backdrop"
          checked={!hidePreview}
          onChange={toggleHidePreview}
          onBlur={closeOnBlur}
        >
          <div className="flex flex-col max-w-3/4">Show note preview</div>
        </MenuItem>
        <MenuItem
          type={MenuItemType.SwitchButton}
          className="py-1 hover:bg-contrast focus:bg-info-backdrop"
          checked={!hideDate}
          onChange={toggleHideDate}
          onBlur={closeOnBlur}
        >
          Show date
        </MenuItem>
        <MenuItem
          type={MenuItemType.SwitchButton}
          className="py-1 hover:bg-contrast focus:bg-info-backdrop"
          checked={!hideTags}
          onChange={toggleHideTags}
          onBlur={closeOnBlur}
        >
          Show tags
        </MenuItem>
        <MenuItem
          type={MenuItemType.SwitchButton}
          className="py-1 hover:bg-contrast focus:bg-info-backdrop"
          checked={!hideEditorIcon}
          onChange={toggleEditorIcon}
          onBlur={closeOnBlur}
        >
          Show editor icon
        </MenuItem>
        <div className="h-1px my-2 bg-border"></div>
        <div className="px-3 py-1 text-xs font-semibold color-text uppercase">
          Other
        </div>
        <MenuItem
          type={MenuItemType.SwitchButton}
          className="py-1 hover:bg-contrast focus:bg-info-backdrop"
          checked={!hidePinned}
          onChange={toggleHidePinned}
          onBlur={closeOnBlur}
        >
          Show pinned notes
        </MenuItem>
        <MenuItem
          type={MenuItemType.SwitchButton}
          className="py-1 hover:bg-contrast focus:bg-info-backdrop"
          checked={!hideProtected}
          onChange={toggleHideProtected}
          onBlur={closeOnBlur}
        >
          Show protected notes
        </MenuItem>
        <MenuItem
          type={MenuItemType.SwitchButton}
          className="py-1 hover:bg-contrast focus:bg-info-backdrop"
          checked={showArchived}
          onChange={toggleShowArchived}
          onBlur={closeOnBlur}
        >
          Show archived notes
        </MenuItem>
        <MenuItem
          type={MenuItemType.SwitchButton}
          className="py-1 hover:bg-contrast focus:bg-info-backdrop"
          checked={showTrashed}
          onChange={toggleShowTrashed}
          onBlur={closeOnBlur}
        >
          Show trashed notes
        </MenuItem>
      </Menu>
    );
  }
);
