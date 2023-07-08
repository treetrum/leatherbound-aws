import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { PrivateWritePublicReadBucket } from './private-write-public-read-bucket';

export class LeatherboundAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lbBackendUser = new iam.User(this, 'LBBackendUser', {
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')],
    });

    new PrivateWritePublicReadBucket(this, 'LBCoversBucket', lbBackendUser);
  }
}
