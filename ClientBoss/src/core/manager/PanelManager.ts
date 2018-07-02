module game {
    export function openPanel(panelType: PanelType, data: any = null) {
        let panel: PanelComponent;
        switch (panelType) {
            case PanelType.win:
                panel = WinScene.getInstance();
                break;
            case PanelType.rank:
                panel = RankPanel.getInstance();
                break;
            case PanelType.lucky:
                panel = BattleLucky.getInstance();
                break;
            case PanelType.bag:
                panel = BattleBag.getInstance();
                break;
            case PanelType.register:
                panel = RegisterPanel.getInstance();
                break;
            case PanelType.user:
                panel = UserPanel.getInstance();
                break;
        }
        if (panel) {
            panel.show();
        }
    }

    export const enum PanelType {
        win = 1,
        rank,
        lucky,
        bag,
        register,
        user,
    }
}