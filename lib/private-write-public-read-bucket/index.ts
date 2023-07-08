import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class PrivateWritePublicReadBucket extends s3.Bucket {
  constructor(scope: Construct, id: string, user: iam.User) {
    super(scope, id, {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      versioned: true,
    });
    this.addResourcePolicies(user);
  }

  addResourcePolicies(user: iam.User) {
    // Passed in user can read/write all objects
    this.addToResourcePolicy(
      new iam.PolicyStatement({
        resources: [this.bucketArn, `${this.bucketArn}/*`],
        actions: ['s3:GetObject', 's3:PutObject'],
        principals: [new iam.ArnPrincipal(user.userArn)],
      })
    );

    // Anyone can read all objects
    this.addToResourcePolicy(
      new iam.PolicyStatement({
        resources: [this.bucketArn, `${this.bucketArn}/*`],
        actions: ['s3:GetObject'],
        principals: [new iam.AnyPrincipal()],
      })
    );
  }
}
