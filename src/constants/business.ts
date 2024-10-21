import { transformRecordToOption } from '@/utils/common';

export const enableStatusRecord: Record<number, App.I18n.I18nKey> = {
  1: 'page.manage.common.status.enable',
  2: 'page.manage.common.status.disable'
};

export const enableStatusOptions = transformRecordToOption(enableStatusRecord);

export const userGenderRecord: Record<Api.SystemManage.UserGender, App.I18n.I18nKey> = {
  1: 'page.manage.user.gender.male',
  2: 'page.manage.user.gender.female'
};

export const userGenderOptions = transformRecordToOption(userGenderRecord);

export const menuTypeRecord: Record<Api.SystemManage.MenuType, App.I18n.I18nKey> = {
  1: 'page.manage.menu.type.directory',
  2: 'page.manage.menu.type.menu'
};

export const menuTypeOptions = transformRecordToOption(menuTypeRecord);

export const menuIconTypeRecord: Record<Api.SystemManage.IconType, App.I18n.I18nKey> = {
  1: 'page.manage.menu.iconType.iconify',
  2: 'page.manage.menu.iconType.local'
};

export const menuIconTypeOptions = transformRecordToOption(menuIconTypeRecord);

export const gameStatusRecord: Record<Api.OpsManage.GameStatus, App.I18n.I18nKey> = {
  1: 'page.opsManage.game.statusOption.running',
  2: 'page.opsManage.game.statusOption.stopped',
  3: 'page.opsManage.game.statusOption.merged',
  4: 'page.opsManage.game.statusOption.operating'
};

export const gameStatusOptions = transformRecordToOption(gameStatusRecord);

export const gameTypeRecord: Record<Api.OpsManage.GameType, App.I18n.I18nKey> = {
  1: 'page.opsManage.game.typeOption.game',
  2: 'page.opsManage.game.typeOption.cross',
  3: 'page.opsManage.game.typeOption.common'
};

export const gameTypeOptions = transformRecordToOption(gameTypeRecord);
