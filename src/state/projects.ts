import { get } from 'svelte/store';
import { colors } from './themes';
import Project from '../model/Project';

export const projects: Project[] = [
    new Project(
        'GRAVY',
        'Inter',
        'bold',
        100,
        0.6,
        'https://raw.githubusercontent.com/thud/gravy/master/public/images/demo.gif',
        'https://gravy.thud.dev/'
    ),
    new Project(
        '404 Page',
        'Fira Code',
        'bold',
        100,
        0.6,
        'https://raw.githubusercontent.com/thud/404page/master/public/images/demo.gif',
        'https://thud.dev/thispagedoesnotexist'
    ),
    new Project(
        'Dashboard App',
        'Fira Code',
        'bold',
        100,
        0.1,
        'https://raw.githubusercontent.com/thud/Dashboard-App/master/.git_example/graph1.gif',
        'https://github.com/thud/Dashboard-App'
    ),
    new Project(
        'EPQ',
        'Fira Code',
        'bold',
        100,
        0.1,
        get(colors).yellow,
        'https://github.com/thud/EPQ-Report'
    ),
    new Project(
        'eccdemo',
        'Fira Code',
        'bold',
        100,
        0.1,
        get(colors).aqua,
        'https://github.com/thud/eccdemo'
    ),
    new Project(
        'dotfiles',
        'Fira Code',
        'bold',
        100,
        0.1,
        get(colors).blue,
        'https://github.com/thud/dotfiles'
    ),
];
