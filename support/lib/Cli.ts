class Cli {
    private Process: any = process;

    public getCliParams(): void {
        const obj: any = {};
        this.Process.params = {};

        this.Process.argv.forEach((element: string): void => {
            if (element.includes('--')) {
                const spl: any = element.replace('--', '').split('=');
                obj[spl[0]] = spl[1];

                if (spl[0] === 'buildUrl') {
                    const numberPattern = /\/\d+\//g;

                    obj['buildNo'] = spl[1].match(numberPattern)[0].replace(/\D/g, '');
                }
            }
        });

        this.Process.params = obj;
    }

    /**
     *
     * @param paramName
     */
    public get(paramName: string): string {
        return this.Process.params[paramName];
    }

    /**
     *
     * @param name
     * @param value
     */
    public set(name: string, value: string): void {
        this.Process.params[name] = value;
    }
}

export default new Cli();