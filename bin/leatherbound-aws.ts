#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LeatherboundAwsStack } from '../lib/leatherbound-aws-stack';

const app = new cdk.App();
new LeatherboundAwsStack(app, 'LeatherboundAwsStack', {});
